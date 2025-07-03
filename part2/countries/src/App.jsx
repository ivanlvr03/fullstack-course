import { useState, useEffect } from "react";
import countryService from './services/countries';
import weatherService from './services/weather';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (query) {
      countryService
        .getAll()
        .then(allCountries => {
          const response = allCountries.filter(c =>
            c.name.common.toLowerCase().includes(query.toLowerCase())
          );
          setCountries(response);
          if (response.length === 1) {
            setSelectedCountry(response[0]);
          } else {
            setSelectedCountry(null);
          }
        });
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <p>find countries <input value={query} onChange={handleQueryChange} /></p>
      <CountryResults
        countries={countries}
        selectedCountry={selectedCountry}
        onShowCountry={handleShowCountry}
      />
    </div>
  );
};

const CountryResults = ({ countries, selectedCountry, onShowCountry }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      const capital = selectedCountry.capital[0];
      weatherService
        .getWeather(capital)
        .then(data => {
          setWeather(data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setWeather(null);
        });
    } else {
      setWeather(null);
    }
  }, [selectedCountry]);

  if (selectedCountry) {
    const country = selectedCountry;
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

        {weather && (
          <>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)} °C</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Wind: {weather.wind.speed} m/s</p>
          </>
        )}
      </div>
    );
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => onShowCountry(country)}>show</button>
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default App;
