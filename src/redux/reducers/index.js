import {combineReducers} from 'redux';
import authReducer from './auth';
import pokemonsReducer from './pokemons';

export default combineReducers({
  auth: authReducer,
  pokemons: pokemonsReducer,
});
