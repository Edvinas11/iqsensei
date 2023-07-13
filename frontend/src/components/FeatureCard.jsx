import React from 'react'
import styles from '../style';

const FeatureCard = ({ content, title }) => {
  return (
    <div className='flex justify-between flex-col px-10 py-12 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card'>
        <h1 className="font-poppins font-semibold text-[32px] text-black mb-4">{title}</h1>
        <div className='flex flex-row'>
            <div className='flex flex-col'>
                <p className={`${styles.paragraph} text-base mb-2`}>{content}</p>
            </div>
        </div>
    </div>
  )
}

export default FeatureCard