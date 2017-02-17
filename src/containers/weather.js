import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from '../components/google_map';
import ForecastSparkline from '../components/forecast_sparkline';

class Weather extends Component {
  forecastRange = 7;
  getForecastHigh(weatherData, range) {
    if (weatherData && weatherData.forecast) {
      return weatherData.forecast.simpleforecast.forecastday.slice(0, this.forecastRange).map(function(forecast) {
        return forecast.high.celsius;
      });
    }
  }
  
  forecastSummary(weatherData) {
    return (
      <table className="table table-hover forecast-center">
        <thead>
          <tr>
            <th></th>
            {weatherData.forecast.txt_forecast.forecastday.slice(0, this.forecastRange * 2).map(function(forecast) {
              if (forecast.period % 2 === 0) {
                return (
                  <th 
                    key={forecast.title}
                    className="forecast-center">
                      {forecast.title}
                  </th>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="forecast-right"><strong>Conditions</strong></td>
            {weatherData.forecast.simpleforecast.forecastday.slice(0, this.forecastRange).map(function(forecast) {
              return (
                <td key={forecast.period}>
                  <div><img src={forecast.icon_url}/></div>
                  <div>{forecast.conditions}</div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="forecast-right"><strong>Maximum</strong></td>
            {weatherData.forecast.simpleforecast.forecastday.slice(0, this.forecastRange).map(function(forecast) {
              return (
                <td key={forecast.period}>
                  <div className="forecast-high">{forecast.high.celsius}</div>
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="forecast-right"><strong>Minimum</strong></td>
            {weatherData.forecast.simpleforecast.forecastday.slice(0, this.forecastRange).map(function(forecast) {
              return (
                <td key={forecast.period}>
                  <div className="forecast-low">{forecast.low.celsius}</div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  }

  renderWeather(weatherData) {
    if (weatherData && weatherData.forecast) {
      return (
        this.forecastSummary(weatherData)
      );
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            {this.props.city && <h1>{this.props.city.name}</h1>}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            {this.props.city && <GoogleMap name={this.props.city.name} lat={this.props.city.lat} lon={this.props.city.lon} />}
          </div>
          <div className="col-12 col-lg-6">
            {this.props.city && <ForecastSparkline data={this.getForecastHigh(this.props.cityWeather)} color="indianred"/>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.renderWeather(this.props.cityWeather)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ city, cityWeather }) {
  return { city, cityWeather };
}
export default connect(mapStateToProps)(Weather);