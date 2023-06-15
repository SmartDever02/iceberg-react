import { ReactElement } from 'react';

import Input from './Input';
import Badge from 'components/Badge';
import useRemoveTagHandler from 'hooks/useRemoveTagHandler';

interface PropsType extends NFT {
  editable?: boolean;
}

export default function NFTCard(props: PropsType): ReactElement {
  const customTags = props.customized?.info.split(' ');
  const value = props.customized?.value || props.value;

  const { removeTagHandler } = useRemoveTagHandler(props);

  return (
    <div
      className='w-[400px] bg-[#151515] rounded-lg overflow-hidden shadow-lg m-5'
      data-testid='nft-card'
    >
      <div
        className='group h-[300px] overflow-hidden hover:backdrop-blur-sm relative'
        data-testid='card-group'
      >
        <img
          src={props.image}
          alt={`nft-${props.name}`}
          width={300}
          height={300}
          draggable={false}
          loading='lazy'
          className='object-cover w-full h-full group-hover:scale-125 group-hover:rotate-2 transition-all duration-300'
        />
        <div
          data-testid='backdrop-blur-panel'
          className='opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm absolute top-0 left-0 w-full h-full bg-black/50 p-4 flex flex-col justify-between'
        >
          {/*  */}
          {props.editable && <Input nft={props} />}
        </div>
      </div>
      <div className='p-5'>
        <div className='pb-6 flex justify-between items-end'>
          <p className='text-xl font-semibold text-white'>{props.name}</p>
          <p className='font-semibold text-white'>
            <span className='text-2xl font-semibold'>
              {value.toLocaleString()}
            </span>
            <span className='text-gray-300'>{' ETH'}</span>
          </p>
        </div>
        <div className='text-lg font-semibold'>
          {props.info}
          <ol className='pt-2 flex flex-wrap gap-x-3 gap-y-2'>
            {customTags?.map((word: string, index: number) => (
              <Badge
                key={word}
                removeHandler={
                  props.editable ? () => removeTagHandler(index) : undefined
                }
              >
                {word}
              </Badge>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
