import React from 'react';
import styles from '../style';
import { Navbar } from '../components';

const Dashboard = () => {
    return (
      <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
  
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}> 
          <p>This is Dashboard page</p>
        </div>
      </div>
    </div>
    )
  }
  
  export default Dashboard