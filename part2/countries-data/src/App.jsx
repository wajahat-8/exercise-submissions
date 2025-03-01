import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(null);
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    console.log('fetching countries...')
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
        console.log('data fetched')
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (!value) {
      setFilteredCountries([]);
      setShow(null);
      return;
    }

    const filtered = allCountries.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCountries(filtered);
  }, [value, allCountries]);
  useEffect(() => {
    console.log("API Key:", API_KEY);

    if (!show || !show.capital || !API_KEY) {
      setWeather(null);
      return;
    }
    console.log("API Key:", API_KEY);

    const capital = show.capital[0];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather:', error);
        setWeather(null);
      });
  }, [show, API_KEY]);


  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (key) => {
    const country = filteredCountries.find((c) => c.cca3 === key);
    console.log(country)
    setShow(country);
    setWeather(null);
  };

  return (
    <>
      <p>Find countries: <input value={value} onChange={handleChange} /></p>

      {filteredCountries.length === 0 && value && <p>No country found</p>}

      {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}

      {filteredCountries.length === 1 &&
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Area:</strong> {country.area} km²</p>

            <h2>Languages</h2>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>

            <p><strong>Flag:</strong></p>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
          </div>
        ))
      }


      {!show && filteredCountries.length <= 10 && filteredCountries.length !== 1 &&
        filteredCountries.map(country => (
          <p key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleClick(country.cca3)}>Show details</button>
          </p>
        ))
      }

      {show && (

        <div>
          {console.log(show)}
          <h1>{show.name.common}</h1>
          <p><strong>Capital:</strong> {show.capital?.[0] || 'N/A'}</p>
          <p><strong>Area:</strong> {show.area} km²</p>

          <h2>Languages</h2>
          <ul>
            {Object.values(show.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>

          <p><strong>Flag:</strong></p>
          <img src={show.flags.png} alt={`Flag of ${show.name.common}`} width="150" />

          {weather && (
            <div>
              <h2>Weather in {show.capital?.[0]}</h2>
              <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
              <p><strong>Weather:</strong> {weather.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
          <br></br>
          <button onClick={() => setShow(null)}>Back to List</button>
        </div>
      )}
    </>
  );
};

export default App;
