import axios from 'axios';
import jsonp from 'jsonp';

export const GET_CITIES = 'GET_CITIES';
export const SET_CITY = 'SET_CITY';
export const GET_CITY_WEATHER = 'GET_CITY_WEATHER';

const WEATHER_URL = 'http://api.wunderground.com/api/eef9f58b62ee3066/forecast10day';
const API_KEY = 'eef9f58b62ee3066';


export function getCities(autocompleteData) {
  return {
    type: GET_CITIES,
    payload: autocompleteData
  }
}

export function setCity(cityMetaData) {
  
  return {
    type: SET_CITY,
    payload: cityMetaData 
  };
}

export function getCityWeather(cityURL) {
  const request = axios.get(`${WEATHER_URL}${cityURL}.json`);
  
  return {
    type: GET_CITY_WEATHER,
    payload: request,
  };
}