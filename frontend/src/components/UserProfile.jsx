import React, { useState, useEffect, useRef } from "react";
import { profileCircle, arrowDown, close } from "../assets";
import { connect } from "react-redux";
import { profileLinks } from "../constants";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const UserProfile = ({ username, coins, logout }) => {
  const [profileName, setProfileName] = useState("");
  const [profileCoins, setProfileCoins] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const dropdownRef = useRef(null);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const handleToggleClick = (event) => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const name = capitalizeFirstLetter(username);
    setProfileName(name);
    setProfileCoins(coins);
  }, [username, coins]);

  return (
    <div className="relative z-10">
      {/* Profile button section start */}
      <div
        className="flex flex-row items-center justify-center p-2 md:ml-8 ml-5 bg-primary popup-effect cursor-pointer"
        onClick={handleToggleClick}
      >
        <img src={profileCircle} alt="profile" className="h-[20px] w-[20px] object-contain" />
        <h4 className="font-poppins font-normal text-black text-[16px] ml-2 md:flex hidden">
          {profileName}
        </h4>
        <img
          src={toggle ? close : arrowDown}
          alt="arrow-down"
          className="h-[20px] w-[20px] md:ml-3 md:flex hidden"
        />
      </div>
      {/* Profile button section end */}

      {/* Hidden dropdown section start */}
      {toggle && (
        <div
          ref={dropdownRef}
          className={`absolute p-6 bg-white md:mx-4 md:my-2 min-w-[180px] max-w-[180px] mt-4 rounded-xl sidebar ${
            toggle ? "left-0" : ""
          } xs:left-[-130px] md:left-auto`}
        >
          <div className="flex flex-col mb-4">
            <span className="font-poppins font-thin text-[12px] text-gray-400">
              Coins
            </span>
            <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23px]">
              {profileCoins}
            </h4>
          </div>

          <div className="w-full flex justify-between items-center pt-6 border-t-[1px] border-t-gray-500"></div>

          <ul className="list-none flex flex-col justify-start flex-1">
            {profileLinks.map((link) => (
              <li
                key={link.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-4 text-black hover:text-secondary`}
              >
                <div className="flex flex-row items-center">
                  <img src={link.icon} alt="icon" className="h-[20px] w-[20px] object-contain mr-2"/>
                  <Link to={`/${link.id}`}>{link.title}</Link>
                </div>
              </li>
            ))}
            <div className="w-full flex justify-between items-center pt-6 border-t-[1px] border-t-gray-500"></div>
            <li
              className={`font-poppins font-normal font-pointer text-[16px] mb-0 text-red-500 hover:text-red-800`}
            >
              <Link to="#!" onClick={logout} >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* Hidden dropdown section end */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
  coins: state.profile.coins,
});

export default connect(mapStateToProps, { logout })(UserProfile);
