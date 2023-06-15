import { ReactElement } from 'react';
import { RemoveIcon } from './icons';

export default function Badge({
  children,
  removeHandler,
}: {
  removeHandler?: () => void;
  children: string;
}): ReactElement {
  return (
    <span
      className={`inline-block rounded-full text-black px-3 py-1 text-sm opacity-100 group-hover:opacity-100 select-none ${
        removeHandler ? 'bg-red-200' : 'bg-white'
      } shadow-textBadge flex items-center gap-x-1`}
      data-testid={removeHandler ? 'badge-removable' : 'badge'}
    >
      {children}
      {removeHandler && (
        <button onClick={removeHandler}>
          <RemoveIcon />
        </button>
      )}
    </span>
  );
}
