import { GET_CITY_WEATHER } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case GET_CITY_WEATHER:
      return action.payload.data;
    default:
      return state;
  }
}