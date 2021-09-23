import React, { Fragment } from "react";
import Geo from "../components/geo.component";
import Temperature from "../components/temperature.component";
import Detail from "../components/detail.component";
import Diagram from "../components/diagram.component";
import ThemeSwitcher from "../components/themeSwitcher.component";
import AutocompleteContainer from "./autocomplete.container";
import {
  getWeatherByLocation,
  getWeatherByCity,
} from "../utils/getWeatherData";
import { ClipLoader } from "react-spinners";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false,
      theme: "dark",
      location: null,
      current: null,
      forecast: null,
    };
  }

  componentDidMount() {
    this._setDataWeather();
  }

  _setDataWeather = async (cityName) => {
    if (cityName) {
      const weatherData = await getWeatherByCity(cityName);
      if (!weatherData.error) {
        this.setState({
          loaded: true,
          error: false,
          location: weatherData.location,
          current: weatherData.current,
          forecast: weatherData.forecast,
        });
        return;
      }
    } else {
      let lat = 28.6304;
      let lng = 77.2177;
      let weatherData = await getWeatherByLocation(lat, lng);
      await navigator.geolocation.getCurrentPosition(async (res) => {
        if (res.coords) {
          lat = res.coords.latitude;
          lng = res.coords.longitude;
          weatherData = await getWeatherByLocation(lat, lng);
          this.setState({
            loaded: true,
            error: false,
            location: weatherData.location,
            current: weatherData.current,
            forecast: weatherData.forecast,
          });
          return;
        }
      });
      this.setState({
        loaded: true,
        error: false,
        location: weatherData.location,
        current: weatherData.current,
        forecast: weatherData.forecast,
      });
      return;
    }
  };

  // Fetch the data using city name from input on page
  handleLocationChange = async (inputText) => {
    this._setDataWeather({ cityName: inputText });
  };

  render() {
    const override = `
  display: block;
  margin: 30% auto;
  border-color: rgba(31, 166, 157, 1);
`;
    if (this.state.location !== null) {
      const { name, region, country, localtime } = this.state.location;
      const { temp_c, wind_kph, humidity, pressure_mb } = this.state.current;
      const { maxtemp_c, mintemp_c } = this.state.forecast.forecastday[0].day;
      const { text, icon } = this.state.current.condition;
      const { forecastday } = this.state.forecast;
      const { loaded } = this.state.loaded;
      return (
        <Fragment>
          <div className="main">
            <div className="panel">
              <AutocompleteContainer
                onLocationChange={this.handleLocationChange}
              />
              <ThemeSwitcher />
            </div>

            <Geo data={{ name, region, country, localtime }} />

            <Temperature data={{ temp_c, maxtemp_c, mintemp_c }} />

            <Detail data={{ text, icon, wind_kph, humidity, pressure_mb }} />

            <Diagram data={{ forecastday, loaded }} />
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <ClipLoader
          color="blue"
          loading={true}
          css={override}
          size={150}
        />
        <p className="spinner-text">Loading...</p>
      </Fragment>
    );
  }
}

export default AppContainer;
