'use client';

import { useState } from 'react';
import { Pagination } from '.';

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [secondPage, setSecondPage] = useState(3);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Pagination Component</h1>
        <p className="text-muted-foreground">Navigation for paginated content</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Basic Usage</h3>
          <div className="border rounded-lg p-4 bg-background">
            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
            <p className="text-sm text-muted-foreground mt-2">Current Page: {currentPage} of 10</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Different Starting Page</h3>
          <div className="border rounded-lg p-4 bg-background space-y-2">
            <Pagination currentPage={secondPage} totalPages={20} onPageChange={setSecondPage} />
            <p className="text-sm text-muted-foreground">Current Page: {secondPage} of 20</p>
          </div>
        </div>
      </div>
    </div>
  );
}
