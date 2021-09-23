import axios from "axios";

const getWeatherByLocation = async (lat, lng) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: { q: `${lat},${lng}`, days: "3" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
    },
  };
  const response = await axios.request(options);
  return response.data;
};

const getWeatherByCity = async (cityName) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    params: { q: cityName, days: "3" },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
    },
  };
  const response = await axios.request(options);
  return response.data;
};

const getAutoCompleteSugesstions = async (textValue) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/search.json",
    params: { q: textValue },
    headers: {
      "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export { getWeatherByLocation, getWeatherByCity, getAutoCompleteSugesstions };
