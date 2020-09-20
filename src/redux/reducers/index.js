import {combineReducers} from 'redux';
import authReducer from './auth';
import regionsReducer from './regions';
import pokemonsReducer from './pokemons';

export default combineReducers({
  auth: authReducer,
  regions: regionsReducer,
  pokemons: pokemonsReducer,
});
