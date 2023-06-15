import { screen } from '@testing-library/react';
import NFTCard from '../pages/components/NFTCard';

import { renderWithProviders } from './testUtils';

const nft: NFT = {
  _id: '0x00',
  image:
    'https://ground-truth-media.jpgstoreapis.com/QmQq5U1a9t8HjsLgxpJvfPdYe6L71D4PEAHpjx8zRjLVSQ.sz_860833.dims_2000x2000.anim_0.png',
  info: 'This is the dummy info',
  name: 'Kong_Arise',
  value: 10000,
};

const customNFT: NFT = {
  ...nft,
  customized: {
    ...nft,
    _id: '0x11',
    info: 'Additional infomation',
  },
};

describe('NFTCard component', () => {
  beforeEach(() => {
    renderWithProviders(<NFTCard {...nft} />);
  });

  it('Image element should be there in the card', () => {
    const imgElement = screen.getByAltText(`nft-${nft.name}`);
    expect(imgElement).toBeInTheDocument();
  });

  it('NFT name should be there', () => {
    const nftNameElement = screen.getByText(nft.name);
    expect(nftNameElement).toBeInTheDocument();
  });

  it('Input element should be there in the card only when it is editable', () => {
    renderWithProviders(<NFTCard {...nft} editable />);
    const inputElement = screen.getByPlaceholderText(
      'Type tags separated by space'
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('Input element should not be there in the card only when it is not editable', () => {
    renderWithProviders(<NFTCard {...nft} />);
    const inputElement = screen.queryByPlaceholderText(
      'Type tags separated by space'
    );
    expect(inputElement).not.toBeInTheDocument();
  });

  it('Price should be displayed in format of 1,234', () => {
    const priceElement = screen.getByText(nft.value.toLocaleString());
    expect(priceElement).toBeInTheDocument();
  });
});

describe('Custom NFT Card component', () => {
  beforeEach(() => {
    renderWithProviders(<NFTCard {...customNFT} />);
  });

  it('All badges in the card are shown as uneditable in custom page', () => {
    const removables = screen.getAllByTestId('badge');
    const infoLengh = customNFT.info.split(' ').length;
    const addInfoLength = customNFT.customized?.info.split(' ').length || 0;

    expect(removables.length).toEqual(infoLengh + addInfoLength);
  });

  it('Check removable badges in the card', () => {
    renderWithProviders(<NFTCard {...customNFT} editable />);
    const removables = screen.getAllByTestId('badge-removable');
    expect(removables.length).toEqual(
      customNFT.customized?.info.split(' ').length
    );
  });
});
