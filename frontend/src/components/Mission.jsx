import React from "react";
import { layout } from "../style";
import styles from "../style";
import { mission } from "../assets";

const Mission = () => {
  return (
    <section id="mission" className={layout.section}>
      <div className={`${layout.sectionInfo} py-16 my-5`}>
        <h2 className={`${styles.heading2} text-black`}>Our Mission</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis
          aliquet eget mauris tortor.ç Aliquet ultrices ac, ametau. Arcu tortor,
          purus in mattis at sed integer faucibus. Aliquet quis aliquet eget
          mauris tortor.ç Aliquet ultrices ac, ametau. Arcu tortor, purus in
          mattis at sed integer faucibus. Aliquet quis aliquet eget mauris
          tortor.ç Aliquet ultrices ac, ametau. Arcu tortor, purus in mattis at
          sed integer faucibus. Aliquet quis aliquet eget mauris tortor.ç
          Aliquet ultrices ac, ametau.
        </p>
      </div>

      <div className={`${layout.sectionInfo} my-10`}>
        <img src={mission} alt="mission" className="w-[100%] h-auto relative"/>
      </div>
    </section>
  );
};

export default Mission;
