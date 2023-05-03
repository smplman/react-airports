import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const [icao, setIcao] = useState('KSDF')
  const [airportData, setAirportData] = useState()
  const apiUrl = `/api/v1/airports?apt=${icao}`

  function handleAirportCodeChange (event) {
    if (event?.target?.value) {
      setIcao(event?.target.value)
    }
  }

  async function getAirportData () {
    axios.get(apiUrl)
    .then((res) => {
      console.log(res)
      setAirportData(res.data);
    })
    .catch((e) => {
      console.log('Error fetching airport data', e)
    })
  }

  return (
    <>
      <div>
        <input type="text" name="icao" value={icao} onChange={handleAirportCodeChange}/>
        <button onClick={() => getAirportData()}>Search</button>
        { !airportData
          ? <p>Please enter an airport code to search for</p>
          : <h1>{airportData?.[icao.toUpperCase()]?.[0]?.facility_name}</h1>
        }
      </div>
    </>
  )
}

export default App
