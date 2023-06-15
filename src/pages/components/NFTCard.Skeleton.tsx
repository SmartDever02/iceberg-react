import { ReactElement } from 'react';

export default function NFTCardSkeleton(): ReactElement {
  return (
    <div
      className='w-[400px] rounded-lg overflow-hidden shadow-lg m-5'
      data-testid='nft-card-skeleton'
    >
      <div
        className='group h-[300px] overflow-hidden hover:backdrop-blur-sm relative bg-[#303030] animate-pulse'
        data-testid='card-group-skeleton'
      ></div>
      <div className='bg-[#151515] p-5 pb-6 flex justify-between items-center'>
        <div className='my-1 h-5 w-32 bg-[#202020] rounded-md animate-pulse' />
        <p className='font-semibold text-white flex items-center gap-x-2'>
          <div className='h-6 my-2 w-24 bg-[#202020] rounded-md'></div>
          <span className='h-4 w-10 bg-[#202020] rounded-md'></span>
        </p>
      </div>
    </div>
  );
}
