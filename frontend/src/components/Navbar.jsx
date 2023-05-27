import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useState } from 'react';
import Button from './Button';

const Navbar = () => {
  const [toogle, setToogle] = useState(false);

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt="iqsensei" className='w-[140px] h-[60px]' />

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal font-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-black`}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <Button styles={`ml-10 sm:flex hidden bg-purple-gradient text-primary `} text={`Sign Up`} />

      <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toogle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain' onClick={() => setToogle((prev) => !prev)}/>
          <div className={`${toogle ? 'flex' : 'hidden'} p-6 bg-purple-gradient absolute top-20 right-0 mx-4 my-2 min-w[140px] rounded-xl sidebar`}>
            <ul className='list-none flex flex-col justify-end items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id} className={`font-poppins font-normal font-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-white`}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              <Button styles={`mt-4 bg-white text-secondary`} text={`Sign Up`} />
            </ul>
          </div>
      </div>

    </nav>
  )
}

export default Navbar