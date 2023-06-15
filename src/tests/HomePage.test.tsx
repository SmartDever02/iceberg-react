import { screen } from '@testing-library/react';

import { renderWithProviders } from './testUtils';
import HomePage from 'pages/HomePage';
import { mockNFTs } from './data';

describe('NFTCard component', () => {
  beforeEach(() => {
    renderWithProviders(<HomePage />);
  });

  it('Container should be there', () => {
    const containerElement = screen.getByTestId('nft-container');
    expect(containerElement).toBeInTheDocument();
  });

  it('Mock NFT cards should be there', () => {
    const cards = screen.queryAllByTestId('nft-card');
    expect(cards.length).toBe(mockNFTs.length);
  });
});
