import React from 'react'
import Country from './Country'

const Countries = ({ countries, setCountryToShow }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length === 1) {
    const foundCountry = countries[0];

    return (
      <Country foundCountry={foundCountry} />
    )
  }
  return (
    <div>
      {countries.map(oneCountry => <div>{oneCountry.name.common} <button onClick={() => setCountryToShow(oneCountry.name.common)}>show</button></div>)}
    </div>
  )
}

export default Countries