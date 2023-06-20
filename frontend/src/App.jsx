import styles from './style';
import { Navbar, Hero } from './components';
import { useEffect, useState } from 'react';

// const apiUrl = 'http://127.0.0.1:8000/users/'
// let displayData

const App = () => {
  // const [users, setUsers] = useState([])

  // async function pullJson() {
  //   const response = await fetch(apiUrl)
  //   const responseData = await response.json()
  //   displayData = responseData.map(function(data) {
  //     return(
  //       <p key={data.id}>{data.name} {data.age} </p>
  //     )
  //   })
  //   console.log(responseData)
  //   setUsers(displayData)
  // }

  // useEffect(() => {
  //   pullJson()
  // },[])

  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}> 
          <Hero />
        </div>
      </div>

    {/* <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}> 
        {users}
      </div>
    </div> */}

  </div>
  )
}

export default App

