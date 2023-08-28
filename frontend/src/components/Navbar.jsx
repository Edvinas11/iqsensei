import { authNavLinks, guestNavLinks } from "../constants";
import { logo, menu, close } from "../assets";
import React, { useState, useEffect, Fragment, useRef } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { UserProfile } from "../components";

const Navbar = ({ isAuthenticated, logout }) => {
  const [toggle, setToggle] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const dropdownRef = useRef(null);

  const authSidebarLinks = (
    <Fragment>
      {authNavLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] ${index === authNavLinks.length - 1 ? "mb-0" : "mb-4"} text-white`}
        >
          <Link to={`/${nav.id}`}>{nav.title}</Link>
        </li>
      ))}

      {/* <li className={`font-poppins font-normal font-pointer text-[16px] mb-0 text-white`}>
        <Link to="#!" onClick={logout}>Logout</Link>
      </li> */}
    </Fragment>
  );

  const guestSidebarLinks = (
    <Fragment>
      {guestNavLinks.map((nav, index) => (
        <li
          key={nav.id}
          className={`font-poppins font-normal cursor-pointer text-[16px] mb-4 text-white`}
        >
          <Link to={`/${nav.id}`}>{nav.title}</Link>
        </li>
      ))}

      <form action="/register">
        <Button
          type="submit"
          color="#8c52ff"
          bgColor="white"
          text="Sign Up"
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
            className={`font-poppins font-normal cursor-pointer text-[16px] mr-10 text-black hover:text-secondary`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}

        <form action="/register">
          <Button
            type="submit"
            color="white"
            bgColor="#8c52ff"
            text="Sign Up"
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
            className={`font-poppins font-normal cursor-pointer text-[16px] ${index === authNavLinks.length - 1 ? "mr-0" : "mr-10"} text-black hover:text-secondary`}
          >
            <Link to={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}

        {/* <li className={`font-poppins font-normal font-pointer text-[16px] mr-0 text-black hover:text-secondary`}>
          <Link to="#!" onClick={logout}>Logout</Link>
        </li> */}

    </Fragment>
  )

  const handleToggleClick = (event) => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShouldClose(true);
    }
  };

  useEffect(() => {
    // Delay closing the dropdown to prevent immediate reopening
    if (shouldClose) {
      const timeout = setTimeout(() => {
        setToggle(false);
        setShouldClose(false);
      }, 100); // Adjust the delay as needed
      return () => clearTimeout(timeout);
    }
  }, [shouldClose]);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to={`${ isAuthenticated ? '/dashboard' : '/'}`}>
        <img src={logo} alt="iqsensei" className="w-[140px] h-[60px]" />
      </Link>

      {/* Navbar section */}
      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        { isAuthenticated ? authLinks : guestLinks }
      </ul>

      {/* Hidden sidebar section */}
      <div className="md:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain popup-effect cursor-pointer"
          onClick={handleToggleClick}
        />
        <div
          className={`${toggle ? "flex" : "hidden"} p-6 bg-purple absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          ref={dropdownRef}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {isAuthenticated ? authSidebarLinks : guestSidebarLinks}
          </ul>
        </div>
      </div>

      {/* Profile section */}
      { isAuthenticated ? (<UserProfile />) : null}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {logout})(Navbar);
