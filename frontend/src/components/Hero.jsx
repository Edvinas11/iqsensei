import styles from "../style";
import Button from "./Button";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-black text-[52px] ss:leading-[100.8px] leading-[75px]">
            Pakeisk Savo <br className="sm:block hidden" />{" "}
            <span>Mokymosi</span>{" "}
            </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-black ss:leading-[100.8px] leading-[75px] w-full">
          Įpročius
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Rask savo kelią į žinių pasaulį. Mokykis ir tobulėk kartu su IQ Sensei!
        </p>
        <form action="/register">
            <Button
                type="submit"
                color="white"
                bgColor="#8c52ff"
                text="Get Started"
                borderRadius="10px"
                styles={`px-5 mt-5`}
            />
        </form>
      </div>  
    </section>
  );
};

export default Hero;
