import { ReactElement } from 'react';

import useAddTagHandler from 'hooks/useAddTagHandler';
import { AddIcon } from 'components/icons';

export default function Input({ nft }: { nft: NFT }): ReactElement {
  const { value, onChangeHandler, submitHandler } = useAddTagHandler(nft);

  return (
    <form noValidate onSubmit={submitHandler} className='relative text-black'>
      <input
        name='tagInput'
        value={value}
        onChange={onChangeHandler}
        placeholder='Type tags separated by space'
        className='opacity-0 group-hover:opacity-100 w-1/3 group-hover:w-full transition-all duration-300 border-none rounded-full h-8 pl-4 delay-100'
      />
      <button className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-250 absolute top-1/2 right-2 -translate-y-1/2'>
        <AddIcon />
      </button>
    </form>
  );
}
