import React from "react";
import styles from "../style";
import { Hero, Navbar, Features, Benefits, CTA, Footer } from "../components";
import { connect } from "react-redux";

const Home = () => {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Features />
          <Benefits />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default connect(null, {})(Home);
