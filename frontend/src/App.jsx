import styles from './style';
import { Navbar, Hero } from './components';
import Records from './records.json';
import { useEffect } from 'react';

const apiUrl = 'http://127.0.0.1:8000/users/'

async function pullJson() {
  const response = await fetch(apiUrl)
  const responseData = await response.json()
  console.log(responseData)
}

// function pullJson() {
//   fetch(apiUrl)
//   .then(response => response.json())
//   .then(responseData => {
//     console.log(responseData)
//   }
//   // return
// }

const App = () => (
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

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}> 

      {
        useEffect(() => {
          pullJson()
        },[])
      }


      {/* {
        Records.map(record => {
          return(
            <div key={ record.id }>
              { record.name } <br/>
              { record.password } <br/>
              { record.age } <br/>
              { record.created } <br/>
              <br/>
            </div>
          )
        })
      } */}
      </div>
    </div>

  </div>
)

export default App