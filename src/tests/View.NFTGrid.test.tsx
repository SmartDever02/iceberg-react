import { screen } from '@testing-library/react';

import { renderWithProviders } from './testUtils';
import NFTGridView from 'pages/components/View.NFTGrid';
import { mockNFTs } from './data';

const props = {
  loading: true,
  editable: false,
  nfts: [],
};

describe('NFTCardGrid component', () => {
  beforeEach(() => {
    renderWithProviders(<NFTGridView {...props} />);
  });

  it('Skeletons should be there for the loading status', () => {
    const skeletons = screen.getAllByTestId('nft-card-skeleton');
    expect(skeletons.length).toBe(6);
  });
});

describe('Skeletons should not be showing for the action pendings', () => {
  const props = {
    loading: true,
    editable: false,
    nfts: mockNFTs,
  };
  renderWithProviders(<NFTGridView {...props} />);

  const skeletons = screen.queryAllByTestId('nft-card-skeleton');
  expect(skeletons.length).toBe(0);

  const cards = screen.getAllByTestId('nft-card');
  expect(cards.length).toBe(mockNFTs.length);
});
