import { GET_CITIES } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case GET_CITIES:
      return action.payload;
    default:
      return state;
  }
}