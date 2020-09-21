import {
  FETCH_POKEMONS,
  FETCH_POKEMONS_START,
  FETCH_POKEMONS_FINISH,
} from '../utils/actions';

const initialState = {
  pokemons: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMONS_START:
      return {...state, isLoading: true};
    case FETCH_POKEMONS:
      return {
        pokemons: action.pokemons,
      };
    case FETCH_POKEMONS_FINISH:
      return {...state, isLoading: false};
    default:
      return state;
  }
};
