import { ReactElement } from 'react';

import { TableContainer } from './TableViewContainer';
import NFTCardSkeleton from './NFTCard.Skeleton';
import NFTCard from './NFTCard';

type PropsType = {
  loading: boolean;
  nfts: NFT[];
  editable: boolean;
};

export default function NFTGridView(props: PropsType): ReactElement {
  return (
    <TableContainer>
      {props.loading && props.nfts.length === 0
        ? new Array(6)
            .fill(true)
            .map((_elem, index) => (
              <NFTCardSkeleton key={`skeleton-${index}`} />
            ))
        : props.nfts.map((nft: NFT) => (
            <NFTCard {...nft} key={nft._id} editable={props.editable} />
          ))}
    </TableContainer>
  );
}
