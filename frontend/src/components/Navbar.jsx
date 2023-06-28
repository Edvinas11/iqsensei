import { authNavLinks, guestNavLinks, themeColors } from "../constants";
import { logo, menu, close } from "../assets";
import React, { useState, Fragment } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ isAuthenticated }) => {
  const [toogle, setToogle] = useState(false);

  const authSidebarLinks = (
    <Fragment>
      {authNavLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-normal font-pointer text-[16px] ${index === authNavLinks.length - 1 ? 'mb-0' : 'mb-4'} text-white`}
        >
          <a href={`/${nav.id}`}>{nav.title}</a>
        </li>
      ))}
    </Fragment>
  );

  const guestSidebarLinks = (
    <Fragment>
      {guestNavLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-normal font-pointer text-[16px] mb-4 text-white`}
        >
          <a href={`/${nav.id}`}>{nav.title}</a>
        </li>
      ))}

      <form action="/register">
        <Button
          type="submit"
          color="#8c52ff"
          bgColor="white"
          text="Get Started"
          borderRadius="10px"
        />
      </form>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {guestNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal font-pointer text-[16px] mr-10 text-black`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}

        <form action="/register">
          <Button
            type="submit"
            color="white"
            bgColor="#8c52ff"
            text="Get Started"
            borderRadius="10px"
            styles={`md:flex hidden px-5`}
          />
        </form>
    </Fragment>
  )

  const authLinks = (
    <Fragment>
      {authNavLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal font-pointer text-[16px] ${index === authNavLinks.length - 1 ? 'mr-0' : 'mr-10'} text-black`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
    </Fragment>
  )

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="iqsensei" className="w-[140px] h-[60px]" />

      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        { isAuthenticated ? authLinks : guestLinks }
      </ul>

      <div className="md:hidden flex flex-1 justify-end items-center">
        <img
          src={toogle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToogle((prev) => !prev)}
        />
        <div
          className={`${
            toogle ? "flex" : "hidden"
          } p-6 bg-purple absolute top-20 right-0 mx-4 my-2 min-w[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {isAuthenticated ? authSidebarLinks : guestSidebarLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Navbar);
