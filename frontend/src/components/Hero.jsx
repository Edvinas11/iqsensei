import styles from "../style";
import Button from "./Button";
import { welcome } from "../assets";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 py-16 my-10`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-black dark:text-dark-primary text-[52px] ss:leading-[100.8px] leading-[75px]">
            Pakeisk Savo <br className="sm:block hidden" />{" "}
            <span>Mokymosi</span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-black dark:text-dark-primary ss:leading-[100.8px] leading-[75px] w-full">
          Įpročius
        </h1>
        <p className={`${styles.paragraph} dark:text-dark-primary max-w-[470px] mt-5`}>
          Rask savo kelią į žinių pasaulį. Mokykis ir tobulėk kartu su IQ
          Sensei!
        </p>
        <form action="/register">
          <Button
            type="submit"
            color="white"
            text="Get Started"
            borderRadius="10px"
            styles={`px-5 mt-5 bg-secondary dark:bg-dark-secondary`}
          />
        </form>
      </div>
      <div className={`flex-1 flex ${styles.flexStart} md:my-0 my-10 xs:mx-10 relative py-16`}>
        <img src={welcome} alt="welcome" className="w-[100%] h-auto relative"/>
      </div>
    </section>
  );
};

export default Hero;
