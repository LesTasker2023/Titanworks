# Accordion Component

A production-grade, accessible accordion for expandable/collapsible content sections.

## Features

- Keyboard accessible
- Only one section open at a time
- Customizable content
- Fully style-guide compliant

## Usage

```tsx
import { Accordion } from './Accordion';

<Accordion
  items={[
    { title: 'Section 1', content: <div>Content 1</div> },
    { title: 'Section 2', content: <div>Content 2</div> },
  ]}
/>;
```
