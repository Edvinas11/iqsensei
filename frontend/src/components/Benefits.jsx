import React from 'react';
import { layout } from '../style';
import styles from '../style';
import { books } from '../assets/index';
import { benefits } from '../constants';

const BenefitCard = ({ title, icon, content, index }) => (
  <div className={`flex-1 flex-row p-6 rounded-[20px] ${index !== benefits.length - 1 ? "mb-6" : "mb-0"}`}>
    <div className='flex-1 flex flex-row ml-3'>
      <div className={`w=[60px] h-[64px] ${styles.flexCenter}`}>
        <img src={icon} alt="icon" className="w-[70%] h-[70%] object-contain"/>
      </div>
      <div className='flex-1 flex flex-col ml-3'>
        <h4 className="font-poppins font-semibold text-black dark:text-dark-primary text-[18px] leading-[23px] mb-2">{title}</h4>
        <p className={`font-poppins ${styles.paragraph} dark:text-dark-primary font-normal text-black leading-[24px]`}>{content}</p>
      </div>
    </div>
  </div>
)

const Benefits = () => {
  return (
    <section id="benefits" className={layout.section}>
      <div className={`${layout.sectionInfo} my-10`}>
        <img src={books} alt="books" className='w-[100%] h-auto' />
      </div>

      <div className={`${layout.sectionImg} flex-col py-16 my-10`}>
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.id} {...benefit} index={index}/>
        ))}
      </div>
    </section>
  )
}

export default Benefits