import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = (city) => {
  return axios.get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching weather data:', error);
      throw error;
    });
}

export default { getWeather };