import { navLinks, themeColors } from '../constants';
import { logo, menu, close } from '../assets';
import { useState } from 'react';
import Button from './Button';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toogle, setToogle] = useState(false);

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <img src={logo} alt="iqsensei" className='w-[140px] h-[60px]' />

      <ul className='list-none md:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal font-pointer text-[16px] mr-10 text-black`}>
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>
      
      <form action="/login">
        <Button type="submit" color="white" bgColor="#8c52ff" text="Log In" borderRadius="10px" styles={`md:flex hidden px-5`} />
      </form>
      

      <div className='md:hidden flex flex-1 justify-end items-center'>
          <img src={toogle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain' onClick={() => setToogle((prev) => !prev)}/>
          <div className={`${toogle ? 'flex' : 'hidden'} p-6 bg-purple absolute top-20 right-0 mx-4 my-2 min-w[140px] rounded-xl sidebar`}>
            <ul className='list-none flex flex-col justify-end items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id} className={`font-poppins font-normal font-pointer text-[16px] mb-4 text-white`}>
                  <a href={`/${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              <form action="/login">
                <Button type="submit" color="#8c52ff" bgColor="white" text="Log In" borderRadius="10px" />
              </form>
            </ul>
          </div>
      </div>
    </nav>
  )
}

export default Navbar