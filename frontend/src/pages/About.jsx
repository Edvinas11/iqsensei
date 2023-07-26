import React from 'react';
import styles from '../style';
import { Navbar, Mission, Leaders, Footer } from '../components';
import { connect } from 'react-redux';

const About = () => {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <section id='aboutus' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
            <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 py-16 my-10`}>
              <div className='flex flex-row justify-center items-center w-full'>
                <h1 className='font-poppins font-semibold ss:text-[72px] text-black text-[52px] ss:leading-[100.8px] leading-[75px]'>About Us</h1>
              </div>
              <p className={`${styles.paragraph} text-center max-w-[970px] mt-5`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit sed urna fermentum efficitur. Donec vel elit sed urna fermentum efficitur.
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Mission />
          <Leaders />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default connect(null, {})(About);