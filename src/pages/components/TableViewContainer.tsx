import { ReactNode } from 'react';

export function TableContainer({ children }: { children: ReactNode }) {
  return (
    <div
      data-testid='nft-container'
      className='container mx-auto mt-5 flex flex-wrap justify-center gap-4 pb-10'
    >
      {children}
    </div>
  );
}
