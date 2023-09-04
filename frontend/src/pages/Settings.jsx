import React from 'react';
import styles from "../style";
import { Navbar } from "../components";
import { connect } from "react-redux";

const Settings = () => {
  return (
    <div className="bg-primary w-full h-screen overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          hi
        </div>
      </div>
    </div>
  )
}

export default connect(null)(Settings);