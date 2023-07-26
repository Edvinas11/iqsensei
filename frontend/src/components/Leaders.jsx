import React from "react";
import styles from "../style";
import { leaders } from "../constants";

const LeaderCard = ({ name, image, position }) => {
  return (
    <div className="flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
      <div className="flex flex-col justify-center items-center">
        {/* Profile picture */}
        <div className={`w-[80%] h-[80%] ${styles.flexCenter}`}>
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <img
              src={image}
              alt="profilePicture"
              className="w-full h-full object-contain transform scale-150"
            />
          </div>
        </div>
        {/* Name */}
        <h4 className="font-poppins font-semibold text-black text-[18px] leading-[23px] mt-10 mb-2">{name}</h4>
        {/* Position */}
        <p className={`font-poppins ${styles.paragraph} font-normal text-black leading-[24px]`}>{position}</p>
      </div>
    </div>
  );
};

const Leaders = () => {
  return (
    <section id="leaders" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 py-16 my-5`}>
        <div className="flex flex-row justify-center items-center w-full">
          <h1 className="font-poppins font-semibold ss:text-[72px] text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
            Meet Our Leaders
          </h1>
        </div>
        <p className={`${styles.paragraph} text-center max-w-[970px] mt-5`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
          elit sed urna fermentum efficitur. Donec vel elit sed urna fermentum
          efficitur.
        </p>

        <div className="flex flex-wrap items-center justify-center w-full feedback-container relative py-16 my-10">
          {leaders.map((leader) => (
            <LeaderCard key={leader.id} {...leader} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
