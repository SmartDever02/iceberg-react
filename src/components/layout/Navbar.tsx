import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(): ReactElement {
  return (
    <nav className='sticky top-0 border-b-2 border-b-[#202020] bg-black/10 backdrop-blur-xl z-10'>
      <div className='container max-md:px-5 mx-auto h-20 flex items-center'>
        <NavLink to='/' className='font-semibold text-2xl'>
          NFTIFY
        </NavLink>
        <NavLink to='/custom' className='ml-auto'>
          Custom
        </NavLink>
      </div>
    </nav>
  );
}
