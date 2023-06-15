import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInfoAction } from 'redux/slices/dataSlice';
import { AppDispatch } from 'redux/store';

export default function useAddTagHandler(nft: NFT) {
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    name === 'tagInput' && setValue(inputValue);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const word = value;
    setValue('');

    dispatch(addInfoAction({ word, nft }));
  };
  return { value, onChangeHandler, submitHandler };
}
