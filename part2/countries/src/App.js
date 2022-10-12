import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
  })

  const [countryData, setData] = useState([])
  const [countryToShow, setCountryToShow] = useState('')
  const countriesToShow = countryToShow ? countryData.filter(country => country.name.common.toUpperCase().indexOf(countryToShow.toUpperCase()) !== -1) : countryData

  const handleFilterChange = (event) => {
    setCountryToShow(event.target.value)
  }

  return (
    <div>
      <form>
        <div>find countries <input onChange={handleFilterChange} /></div>
      </form>
      <Countries countries={countriesToShow} setCountryToShow={setCountryToShow} />
    </div>
  )
}

export default App