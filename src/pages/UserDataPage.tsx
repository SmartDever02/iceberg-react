import { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/store';

import ChartView from './components/View.Chart';
import NFTGridView from './components/View.NFTGrid';

export default function UserDataPage(): ReactElement {
  const { data: nfts, pending } = useSelector((root: RootState) => root.app);

  const chartData: IChartData[] = nfts.map((nft) => ({
    name: nft.name,
    data: nft.value,
    'user data': nft.customized?.value || nft.value,
  }));

  return (
    <>
      <div className='mt-10 container max-md:px-5 mx-auto shadow-xl rounded-lg bg-[#151515]'>
        <ChartView chartData={chartData} />
      </div>

      <NFTGridView
        loading={pending}
        nfts={nfts.filter((nft) => nft.customized)}
        editable={false}
      />
    </>
  );
}
