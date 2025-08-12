import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card Components', () => {
  describe('Card', () => {
    describe('Rendering', () => {
      it('renders with default props', () => {
        render(<Card data-testid="card">Card content</Card>);

        const card = screen.getByTestId('card');
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass('card');
      });

      it('renders with custom className', () => {
        render(
          <Card className="custom-card" data-testid="card">
            Card content
          </Card>
        );

        const card = screen.getByTestId('card');
        expect(card).toHaveClass('card', 'custom-card');
      });

      it('renders as child component when asChild is true', () => {
        render(
          <Card asChild data-testid="custom-card">
            <article>Custom card element</article>
          </Card>
        );

        const card = screen.getByTestId('custom-card');
        expect(card.tagName).toBe('ARTICLE');
        expect(card).toHaveClass('card');
      });

      it('forwards ref correctly', () => {
        const ref = { current: null };
        render(
          <Card ref={ref} data-testid="card">
            Card content
          </Card>
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });

    describe('HTML attributes', () => {
      it('spreads additional props', () => {
        render(
          <Card data-testid="card" aria-label="Test card" role="region">
            Card content
          </Card>
        );

        const card = screen.getByTestId('card');
        expect(card).toHaveAttribute('aria-label', 'Test card');
        expect(card).toHaveAttribute('role', 'region');
      });
    });
  });

  describe('CardHeader', () => {
    it('renders with correct class', () => {
      render(<CardHeader data-testid="card-header">Header content</CardHeader>);

      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('card__header');
    });

    it('renders with custom className', () => {
      render(
        <CardHeader className="custom-header" data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('card__header', 'custom-header');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <CardHeader ref={ref} data-testid="card-header">
          Header
        </CardHeader>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardTitle', () => {
    it('renders with correct class and semantic element', () => {
      render(<CardTitle data-testid="card-title">Title content</CardTitle>);

      const title = screen.getByTestId('card-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('card__title');
      expect(title.tagName).toBe('H3');
    });

    it('renders with custom className', () => {
      render(
        <CardTitle className="custom-title" data-testid="card-title">
          Title
        </CardTitle>
      );

      const title = screen.getByTestId('card-title');
      expect(title).toHaveClass('card__title', 'custom-title');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <CardTitle ref={ref} data-testid="card-title">
          Title
        </CardTitle>
      );

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('CardDescription', () => {
    it('renders with correct class', () => {
      render(<CardDescription data-testid="card-description">Description content</CardDescription>);

      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('card__description');
    });

    it('renders with custom className', () => {
      render(
        <CardDescription className="custom-desc" data-testid="card-description">
          Description
        </CardDescription>
      );

      const description = screen.getByTestId('card-description');
      expect(description).toHaveClass('card__description', 'custom-desc');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <CardDescription ref={ref} data-testid="card-description">
          Description
        </CardDescription>
      );

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe('CardContent', () => {
    it('renders with correct class', () => {
      render(<CardContent data-testid="card-content">Content here</CardContent>);

      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('card__content');
    });

    it('renders with custom className', () => {
      render(
        <CardContent className="custom-content" data-testid="card-content">
          Content
        </CardContent>
      );

      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('card__content', 'custom-content');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <CardContent ref={ref} data-testid="card-content">
          Content
        </CardContent>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardFooter', () => {
    it('renders with correct class', () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);

      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('card__footer');
    });

    it('renders with custom className', () => {
      render(
        <CardFooter className="custom-footer" data-testid="card-footer">
          Footer
        </CardFooter>
      );

      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('card__footer', 'custom-footer');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(
        <CardFooter ref={ref} data-testid="card-footer">
          Footer
        </CardFooter>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card Component Integration', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader data-testid="header">
            <CardTitle data-testid="title">Test Card</CardTitle>
            <CardDescription data-testid="description">This is a test card</CardDescription>
          </CardHeader>
          <CardContent data-testid="content">
            <p>Main card content goes here</p>
          </CardContent>
          <CardFooter data-testid="footer">
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      // Check all components are rendered
      expect(screen.getByTestId('complete-card')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();

      // Check content
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('This is a test card')).toBeInTheDocument();
      expect(screen.getByText('Main card content goes here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders minimal card with just content', () => {
      render(
        <Card data-testid="minimal-card">
          <CardContent>Simple content</CardContent>
        </Card>
      );

      expect(screen.getByTestId('minimal-card')).toBeInTheDocument();
      expect(screen.getByText('Simple content')).toBeInTheDocument();
    });

    it('maintains proper semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Semantic Test</CardTitle>
            <CardDescription>Testing semantics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content paragraph</p>
          </CardContent>
        </Card>
      );

      // Check semantic structure
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('Semantic Test');
      expect(screen.getByText('Testing semantics')).toBeInTheDocument();
    });

    it('supports complex nested content', () => {
      render(
        <Card data-testid="complex-card">
          <CardHeader>
            <CardTitle>Complex Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h4>Nested heading</h4>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('complex-card')).toBeInTheDocument();
      expect(screen.getByText('Complex Card')).toBeInTheDocument();
      expect(screen.getByText('Nested heading')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes on all components', () => {
      render(
        <Card aria-label="Test card" data-testid="card">
          <CardHeader aria-label="Card header" data-testid="header">
            <CardTitle aria-level={2} data-testid="title">
              Title
            </CardTitle>
            <CardDescription aria-describedby="title" data-testid="description">
              Description
            </CardDescription>
          </CardHeader>
          <CardContent aria-label="Card content" data-testid="content">
            Content
          </CardContent>
          <CardFooter aria-label="Card actions" data-testid="footer">
            Footer
          </CardFooter>
        </Card>
      );

      expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Test card');
      expect(screen.getByTestId('header')).toHaveAttribute('aria-label', 'Card header');
      expect(screen.getByTestId('title')).toHaveAttribute('aria-level', '2');
      expect(screen.getByTestId('description')).toHaveAttribute('aria-describedby', 'title');
      expect(screen.getByTestId('content')).toHaveAttribute('aria-label', 'Card content');
      expect(screen.getByTestId('footer')).toHaveAttribute('aria-label', 'Card actions');
    });

    it('maintains proper heading hierarchy', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Main Title</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle>Should still be h3</CardTitle>
          </CardContent>
        </Card>
      );

      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(2);
      expect(headings[0]).toHaveTextContent('Main Title');
      expect(headings[1]).toHaveTextContent('Should still be h3');
    });
  });
});
