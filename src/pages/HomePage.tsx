import { ReactElement } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import NFTGridView from './components/View.NFTGrid';

export default function HomePage(): ReactElement {
  const { data: nfts, pending } = useSelector((root: RootState) => root.app);

  return <NFTGridView loading={pending} nfts={nfts} editable />;
}
