import {combineReducers} from 'redux';
import pokemonsReducer from './pokemons';

export default combineReducers({
  pokemons: pokemonsReducer,
});
