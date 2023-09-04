import React, { useState, useEffect } from "react";
import styles from "../style";
import { Navbar, CoinsCard } from "../components";
import { connect } from "react-redux";

const Dashboard = ({ username }) => {
  const [greeting, setGreeting] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const name = capitalizeFirstLetter(username);
    setGreeting(`Hi, ${name}!`);
  }, [username]);

  return (
    <div className="bg-primary w-full h-screen overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-row justify-between items-center w-full p-10">
            <h1 className="flex-1 font-poppins font-semibold text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
              {greeting || "User"}
            </h1>
          </div>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <CoinsCard />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
});

export default connect(mapStateToProps)(Dashboard);
