import React from "react";
import styles from "../style";
import { Navbar } from "../components";
import { connect } from "react-redux";

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default connect(null, {})(Home);
