import React from "react";
import styles from "../style";
import Button from "./Button";

const CTA = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-purple rounded-[20px] box-shadow`}>
        <div className="flex-1 flex flex-col">
          <h2 className={`${styles.heading2} text-white`}>Lorem Ipsum!</h2>
          <p className={`${styles.paragraph} text-white max-w-[470px] mt-5`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
            elit sed urna fermentum efficitur.
          </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
          <form action="/aboutus">
            <Button
              type="submit"
              color="black"
              bgColor="white"
              text="About Us"
              borderRadius="10px"
              styles={`py-4 px-10 my-2`}
            />
          </form>
        </div>
    </section>
  );
};

export default CTA;
