#!/bin/bash

# 🎯 Quick Component Validation Script
# Run this during development to check style guide compliance

set -e  # Exit on error

COMPONENT_PATH=${1:-""}

if [ -z "$COMPONENT_PATH" ]; then
  echo "❌ Usage: ./validate-quick.sh src/components/ui/ComponentName"
  exit 1
fi

COMPONENT_NAME=$(basename "$COMPONENT_PATH")

echo "🔍 Quick Style Guide Validation for $COMPONENT_NAME"
echo "=================================================="

# Check 1: File structure
echo "📁 Checking file structure..."
REQUIRED_FILES=(
  "$COMPONENT_PATH/index.tsx"
  "$COMPONENT_PATH/${COMPONENT_NAME}.stories.tsx" 
  "$COMPONENT_PATH/${COMPONENT_NAME}.test.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file exists"
  else
    echo "  ❌ Missing: $file"
  fi
done

# Check 2: Required variants in main component file
echo ""
echo "🎨 Checking required variants..."
MAIN_FILE=$(find "$COMPONENT_PATH" -name "*.tsx" -not -name "*.stories.tsx" -not -name "*.test.tsx" -not -name "index.tsx" | head -1)

if [ -f "$MAIN_FILE" ]; then
  echo "  📄 Analyzing: $(basename "$MAIN_FILE")"
  
  # Check color variants
  VARIANTS=("default" "success" "warning" "danger")
  for variant in "${VARIANTS[@]}"; do
    if grep -q "\"$variant\":" "$MAIN_FILE"; then
      echo "  ✅ $variant variant found"
    else
      echo "  ❌ Missing: $variant variant"
    fi
  done
  
  # Check size variants  
  SIZES=("sm" "default" "lg" "xl")
  for size in "${SIZES[@]}"; do
    if grep -q "\"$size\":" "$MAIN_FILE"; then
      echo "  ✅ $size size found"
    else
      echo "  ❌ Missing: $size size"
    fi
  done
  
  # Check required props
  PROPS=("loading" "disabled")
  for prop in "${PROPS[@]}"; do
    if grep -q "${prop}?:" "$MAIN_FILE"; then
      echo "  ✅ $prop prop found"
    else
      echo "  ❌ Missing: $prop prop"
    fi
  done
else
  echo "  ❌ Cannot find main component file"
fi

# Check 3: Test coverage
echo ""
echo "🧪 Checking test coverage..."
TEST_FILE="$COMPONENT_PATH/${COMPONENT_NAME}.test.tsx"

if [ -f "$TEST_FILE" ]; then
  TEST_COUNT=$(grep -c "it(" "$TEST_FILE" || echo 0)
  echo "  📊 Found $TEST_COUNT test cases"
  
  if [ "$TEST_COUNT" -ge 30 ]; then
    echo "  ✅ Test count meets requirement (30+)"
  else
    echo "  ⚠️  Test count below target: $TEST_COUNT/30"
  fi
  
  # Check test categories
  CATEGORIES=("Rendering" "Variants" "Events" "Enhanced Features" "Edge Cases" "Accessibility")
  for category in "${CATEGORIES[@]}"; do
    if grep -q "describe.*$category" "$TEST_FILE"; then
      echo "  ✅ $category test category found"
    else
      echo "  ❌ Missing: $category test category"
    fi
  done
else
  echo "  ❌ Test file not found"
fi

# Check 4: Story coverage
echo ""
echo "📚 Checking story coverage..."
STORY_FILE="$COMPONENT_PATH/${COMPONENT_NAME}.stories.tsx"

if [ -f "$STORY_FILE" ]; then
  STORY_COUNT=$(grep -c "export const" "$STORY_FILE" || echo 0)
  echo "  📖 Found $STORY_COUNT stories"
  
  if [ "$STORY_COUNT" -ge 10 ]; then
    echo "  ✅ Story count meets requirement (10+)"
  else
    echo "  ⚠️  Story count below target: $STORY_COUNT/10"
  fi
  
  # Check required stories
  STORIES=("AllVariants" "AllSizes" "LoadingState" "DisabledState")
  for story in "${STORIES[@]}"; do
    if grep -q "export const $story" "$STORY_FILE"; then
      echo "  ✅ $story story found"
    else
      echo "  ❌ Missing: $story story"
    fi
  done
else
  echo "  ❌ Story file not found"
fi

# Check 5: Quick build test
echo ""
echo "🔨 Running quick build test..."
if yarn build --quiet 2>/dev/null; then
  echo "  ✅ Build passes"
else
  echo "  ❌ Build fails - check for errors"
fi

# Check 6: Quick lint test
echo ""
echo "🔍 Running quick lint test..."  
if yarn lint --quiet 2>/dev/null; then
  echo "  ✅ Lint passes"
else
  echo "  ⚠️  Lint issues found - run 'yarn lint --fix'"
fi

echo ""
echo "=================================================="
echo "🏁 Quick validation complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Fix any ❌ issues above"
echo "  2. Run full validation: node scripts/validate-component.js $COMPONENT_PATH"
echo "  3. Target: 80%+ validation score for shipping"
echo ""
echo "📖 References:"
echo "  - Style Guide Card: docs/STYLE_GUIDE_CARD.txt"
echo "  - Quick Reference: docs/STYLE_GUIDE_QUICK_REFERENCE.md"
