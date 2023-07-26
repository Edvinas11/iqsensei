import React from 'react'
import styles from '../style';
import { features } from '../constants';
import FeatureCard from './FeatureCard';

const Features = () => {
  return (
    <section id='features' className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
        <div className='flex flex-wrap items-center justify-center w-full feedback-container relative'>
            {features.map((card) => (
                <FeatureCard key={card.id} {...card} />
            ))}
        </div>
    </section>
  )
}

export default Features;