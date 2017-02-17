import { combineReducers } from 'redux';
import CitiesReducer from './reducer_cities';
import CityReducer from './reducer_city';
import CityWeatherReducer from './reducer_city_weather';

const rootReducer = combineReducers({
  cities: CitiesReducer,
  city: CityReducer,
  cityWeather: CityWeatherReducer
});

export default rootReducer;
