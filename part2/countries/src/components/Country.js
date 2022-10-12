const Country = ({ foundCountry }) => {
  return (
    <div>
      <h1>{foundCountry.name.common}</h1>
      <p>
        capital {foundCountry.capital} <br />
        area {foundCountry.area}
      </p>

      <h2>languages:</h2>
      <ul>
        {Object.values(foundCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <div>
        <img src={foundCountry.flags.png} alt='flag_png' />
      </div>

      <h2>Weather in {foundCountry.capital}</h2>
    </div>
  )
}

export default Country