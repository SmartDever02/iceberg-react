import { useDispatch } from 'react-redux';
import { removeInfoAction } from 'redux/slices/dataSlice';
import { AppDispatch } from 'redux/store';

export default function useRemoveTagHandler(nft: NFT) {
  const dispatch = useDispatch<AppDispatch>();

  const removeTagHandler = async (wordIndex: number) => {
    dispatch(removeInfoAction({ index: wordIndex, nft: nft }));
  };

  return { removeTagHandler };
}
