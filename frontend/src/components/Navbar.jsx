import { navLinks } from '../constants';

const Navbar = () => {
  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
      <h2 className='font-poppins font-bold text-[24px] text-black uppercase'>Iq Sensei</h2>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal font-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-black`}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar