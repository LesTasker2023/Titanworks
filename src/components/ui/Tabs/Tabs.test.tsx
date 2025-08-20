import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

describe('Tabs', () => {
  describe('Snapshots', () => {
    it('matches default snapshot', () => {
      const { container } = render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Functionality', () => {
    it('renders correctly', () => {
      render(
        <Tabs defaultValue="test" data-testid="tabs">
          <TabsList>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          <TabsContent value="test">Test Content</TabsContent>
        </Tabs>
      );
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
    });

    it('supports size prop', () => {
      render(
        <Tabs defaultValue="test" data-testid="tabs">
          <TabsList size="lg">
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          <TabsContent value="test">Test Content</TabsContent>
        </Tabs>
      );
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
    });
  });
});
