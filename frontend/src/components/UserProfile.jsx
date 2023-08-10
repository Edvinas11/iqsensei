import React, { useState, useEffect } from "react";
import { profileCircle, arrowDown, close } from "../assets";
import { connect } from "react-redux";
import { profileLinks } from "../constants";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const UserProfile = ({ username, coins, logout }) => {
  const [profileName, setProfileName] = useState("");
  const [profileCoins, setProfileCoins] = useState(0);
  const [toggle, setToggle] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const name = capitalizeFirstLetter(username);
    setProfileName(name);
    setProfileCoins(coins);
  }, [username, coins]);

  return (
    <div className="relative z-10">
      <div
        className="flex flex-row items-center justify-center p-2 md:ml-8 ml-5 bg-primary popup-effect cursor-pointer"
        onClick={() => setToggle((prev) => !prev)}
      >
        <img src={profileCircle} alt="profile" className="h-[20px] w-[20px]" />
        <h4 className="font-poppins font-normal text-black text-[16px] ml-2 md:flex hidden">
          {profileName}
        </h4>
        <img
          src={toggle ? close : arrowDown}
          alt="arrow-down"
          className="h-[20px] w-[20px] md:ml-3 md:flex hidden"
        />
      </div>
      {toggle && (
        <div
          className={`absolute p-6 bg-white md:mx-4 md:my-2 min-w-[180px] mt-4 rounded-xl sidebar ${
            toggle ? "left-0" : ""
          } xs:left-[-130px] md:left-auto`}
        >
          <div className="flex flex-col mb-4">
            <span className="font-poppins font-thin text-[12px] text-gray-400">Coins</span>
            <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23px]">{profileCoins}</h4>
          </div>

          <div className="w-full flex justify-between items-center pt-6 border-t-[1px] border-t-gray-500"></div>

          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {profileLinks.map((link) => (
              <li
                key={link.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] mb-4 text-black`}
              >
                <Link to={`/${link.id}`}>{link.title}</Link>
              </li>
            ))}
            <div className="w-full flex justify-between items-center pt-6 border-t-[1px] border-t-gray-500"></div>
            <li
              className={`font-poppins font-normal font-pointer text-[16px] mb-0 text-red-500`}
            >
              <Link to="#!" onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
  coins: state.profile.coins,
});

export default connect(mapStateToProps, { logout })(UserProfile);
