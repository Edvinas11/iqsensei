import React from "react";
import styles from "../style";
import { logo } from "../assets";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <img
            src={logo}
            alt="iqsensei"
            className="w-[200px] h-[120px] object-contain"
          />
          <p className={`${styles.paragraph} mt-1 max-w-[312px]`}>
            From Zero To Hero.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerLink) => (
            <div
              key={footerLink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-black">
                {footerLink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerLink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-black hover:text-secondary cursor-pointer
                    ${index !== footerLink.links.length - 1 ? "mb-4" : "mb-0"}`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#5e5e61]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-black">
          Copyright Ⓒ 2022 iqsensei. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
