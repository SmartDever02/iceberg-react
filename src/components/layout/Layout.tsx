import { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout(props: { children?: ReactNode }): ReactElement {
  return (
    <main className='min-h-screen text-white'>
      <Navbar />
      {props.children}
    </main>
  );
}
