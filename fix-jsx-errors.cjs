#!/usr/bin/env node

const fs = require('fs');

// Fix AlertDialog.test.tsx
console.log('Fixing AlertDialog.test.tsx JSX syntax error...');
const alertDialogPath = 'src/components/ui/AlertDialog/AlertDialog.test.tsx';
let alertDialogContent = fs.readFileSync(alertDialogPath, 'utf8');

// Fix the malformed JSX and test structure
alertDialogContent = alertDialogContent.replace(
  `    <AlertDialogProvider>
      <AlertDialog data-testid="alertdialog" className="class2" />);
      const element = screen.getByTestId('alertdialog');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
    <AlertDialogProvider>
      <AlertDialog data-testid="alertdialog">
          <div>
            <span>Nested content</span>
          </div>
          </AlertDialog>
    </AlertDialogProvider>
        );
        expect(screen.getByTestId('alertdialog')).toBeInTheDocument();
      });`,
  `    render(
      <AlertDialogProvider>
        <AlertDialog data-testid="alertdialog" className="class2" />
      </AlertDialogProvider>
    );
    const element = screen.getByTestId('alertdialog');
    expect(element).toHaveClass('class2');
  });

  it('handles complex nested content', () => {
    render(
      <AlertDialogProvider>
        <AlertDialog data-testid="alertdialog">
          <div>
            <span>Nested content</span>
          </div>
        </AlertDialog>
      </AlertDialogProvider>
    );
    expect(screen.getByTestId('alertdialog')).toBeInTheDocument();
  });`
);

fs.writeFileSync(alertDialogPath, alertDialogContent);
console.log('✅ AlertDialog.test.tsx fixed');

// Fix Dialog.test.tsx (same pattern)
console.log('Fixing Dialog.test.tsx JSX syntax error...');
const dialogPath = 'src/components/ui/Dialog/Dialog.test.tsx';
let dialogContent = fs.readFileSync(dialogPath, 'utf8');

dialogContent = dialogContent.replace(
  `    <DialogProvider>
      <Dialog data-testid="dialog" className="class2" />);
      const element = screen.getByTestId('dialog');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
    <DialogProvider>
      <Dialog data-testid="dialog">
          <div>
            <span>Nested content</span>
          </div>
          </Dialog>
    </DialogProvider>
        );
        expect(screen.getByTestId('dialog')).toBeInTheDocument();
      });`,
  `    render(
      <DialogProvider>
        <Dialog data-testid="dialog" className="class2" />
      </DialogProvider>
    );
    const element = screen.getByTestId('dialog');
    expect(element).toHaveClass('class2');
  });

  it('handles complex nested content', () => {
    render(
      <DialogProvider>
        <Dialog data-testid="dialog">
          <div>
            <span>Nested content</span>
          </div>
        </Dialog>
      </DialogProvider>
    );
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });`
);

fs.writeFileSync(dialogPath, dialogContent);
console.log('✅ Dialog.test.tsx fixed');

// Fix HoverCard.test.tsx (same pattern)
console.log('Fixing HoverCard.test.tsx JSX syntax error...');
const hoverCardPath = 'src/components/ui/HoverCard/HoverCard.test.tsx';
let hoverCardContent = fs.readFileSync(hoverCardPath, 'utf8');

hoverCardContent = hoverCardContent.replace(
  `    <HoverCardProvider>
      <HoverCard data-testid="hovercard" className="class2" />);
      const element = screen.getByTestId('hovercard');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
    <HoverCardProvider>
      <HoverCard data-testid="hovercard">
          <div>
            <span>Nested content</span>
          </div>
          </HoverCard>
    </HoverCardProvider>
        );
        expect(screen.getByTestId('hovercard')).toBeInTheDocument();
      });`,
  `    render(
      <HoverCardProvider>
        <HoverCard data-testid="hovercard" className="class2" />
      </HoverCardProvider>
    );
    const element = screen.getByTestId('hovercard');
    expect(element).toHaveClass('class2');
  });

  it('handles complex nested content', () => {
    render(
      <HoverCardProvider>
        <HoverCard data-testid="hovercard">
          <div>
            <span>Nested content</span>
          </div>
        </HoverCard>
      </HoverCardProvider>
    );
    expect(screen.getByTestId('hovercard')).toBeInTheDocument();
  });`
);

fs.writeFileSync(hoverCardPath, hoverCardContent);
console.log('✅ HoverCard.test.tsx fixed');

// Fix Tooltip.test.tsx (same pattern)
console.log('Fixing Tooltip.test.tsx JSX syntax error...');
const tooltipPath = 'src/components/ui/Tooltip/Tooltip.test.tsx';
let tooltipContent = fs.readFileSync(tooltipPath, 'utf8');

tooltipContent = tooltipContent.replace(
  `    <TooltipProvider>
      <Tooltip data-testid="tooltip" className="class2" />);
      const element = screen.getByTestId('tooltip');
      expect(element).toHaveClass('class2');
    });

    it('handles complex nested content', () => {
      render(
    <TooltipProvider>
      <Tooltip data-testid="tooltip">
          <div>
            <span>Nested content</span>
          </div>
          </Tooltip>
    </TooltipProvider>
        );
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });`,
  `    render(
      <TooltipProvider>
        <Tooltip data-testid="tooltip" className="class2" />
      </TooltipProvider>
    );
    const element = screen.getByTestId('tooltip');
    expect(element).toHaveClass('class2');
  });

  it('handles complex nested content', () => {
    render(
      <TooltipProvider>
        <Tooltip data-testid="tooltip">
          <div>
            <span>Nested content</span>
          </div>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });`
);

fs.writeFileSync(tooltipPath, tooltipContent);
console.log('✅ Tooltip.test.tsx fixed');

console.log('✅ All JSX syntax errors fixed successfully!');
console.log('All 6 compilation errors should now be resolved.');
