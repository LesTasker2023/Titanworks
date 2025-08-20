'use client';

import { useState } from 'react';
import { Modal } from '.';
import { Button } from '../Button';

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Modal Component</h1>
        <p className="text-muted-foreground">General modal overlays</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
                <p className="mb-4">This is a basic modal example.</p>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </div>
            </Modal>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Interactive</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Button onClick={() => setSecondModalOpen(true)}>Open Interactive Modal</Button>
            <Modal isOpen={secondModalOpen} onClose={() => setSecondModalOpen(false)}>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Interactive Modal</h2>
                <p className="mb-4">State: {secondModalOpen ? 'Open' : 'Closed'}</p>
                <Button onClick={() => setSecondModalOpen(false)}>Close</Button>
              </div>
            </Modal>
            <p className="text-sm text-muted-foreground">
              State: {secondModalOpen ? 'Open' : 'Closed'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
