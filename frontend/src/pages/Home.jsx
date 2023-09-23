import React from "react";
import styles from "../style";
import { Hero, Navbar, Features, Benefits, CTA, Footer } from "../components";
import { connect } from "react-redux";
import { darkMoon, lightSun } from "../assets";
import { useStateContext } from "../contexts/contextProvider";

const Home = () => {
  const { currentMode, setMode } = useStateContext();

  const toggleMode = () => {
    const newMode = currentMode === 'Light' ? 'Dark' : 'Light';
    setMode(newMode);
  };

  return (
    <div className="bg-primary dark:bg-dark-primary w-full overflow-hidden">
      <div className="flex relative cursor-pointer" onClick={toggleMode}>
        <div className="fixed right-4 bottom-4 z-30">
          <img src={currentMode === 'Dark' ? lightSun : darkMoon} alt="mode" className="object-contain h-[45px] w-[45px]" />
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary dark:bg-dark-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary dark:bg-dark-primary ${styles.paddingX} ${styles.flexStart}`}>
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
