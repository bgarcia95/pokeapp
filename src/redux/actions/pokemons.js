import {
  FETCH_POKEMONS,
  FETCH_POKEMONS_FINISH,
  FETCH_POKEMONS_START,
} from '../utils/actions';

export const fetchPokemonsStart = () => ({
  type: FETCH_POKEMONS_START,
});

export const fetchPokemonsFinish = () => ({
  type: FETCH_POKEMONS_FINISH,
});

export const fetchPokemonsSuccess = (region) => {
  return async (dispatch) => {
    let tempArr = [];

    dispatch(fetchPokemonsStart());

    const mainGeneration = await fetch(`${region['main_generation']?.url}`);
    const mainGenerationResData = await mainGeneration.json();

    const pokemonSpecie = await Promise.all(
      mainGenerationResData['pokemon_species']?.map(async (entry) => {
        const pokemonSpecie = await fetch(entry?.url);
        const pokemonSpecieResData = await pokemonSpecie.json();

        return {
          description: pokemonSpecieResData['flavor_text_entries']?.find(
            (entry) => entry.language.name === 'en',
          )['flavor_text'],
          id: pokemonSpecieResData.id,
          name: pokemonSpecieResData.name,
        };
      }),
    );

    tempArr = pokemonSpecie;

    const finalPokemonData = await Promise.all(
      tempArr.map(async (pokemon) => {
        const pokemonData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        );
        const pokemonResData = await pokemonData.json();

        return pokemon.id === pokemonResData.id
          ? {
              ...pokemon,
              image: pokemonResData.sprites['front_default'],
              types: pokemonResData.types,
            }
          : pokemon;
      }),
    );

    // console.log(finalPokemonData);

    dispatch({
      type: FETCH_POKEMONS,
      pokemons: finalPokemonData.sort((a, b) => (a.id > b.id ? 1 : -1)),
    });

    dispatch(fetchPokemonsFinish());
  };
};
