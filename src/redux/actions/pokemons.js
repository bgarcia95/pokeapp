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
  return (dispatch) => {
    let tempArr = [];

    dispatch(fetchPokemonsStart());

    fetch(`${region['main_generation']?.url}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        resp['pokemon_species']?.map((entry) => {
          fetch(entry?.url)
            .then((res) => {
              return res.json();
            })
            .then((resp) => {
              tempArr.push({
                description: resp['flavor_text_entries']?.find(
                  (entry) => entry.language.name === 'en',
                )['flavor_text'],
                id: resp.id,
                name: resp.name,
              });
              return resp;
            })
            .then((resp) => {
              fetch(`https://pokeapi.co/api/v2/pokemon/${resp.id}/`)
                .then((response) => response.json())
                .then((resp) => {
                  tempArr = tempArr
                    .map((pokemon) =>
                      pokemon.id === resp.id
                        ? {
                            ...pokemon,
                            image: resp.sprites['front_default'],
                            types: resp.types,
                          }
                        : pokemon,
                    )
                    .sort((a, b) => (a.id > b.id ? 1 : -1));

                  dispatch({
                    type: FETCH_POKEMONS,
                    pokemons: tempArr,
                  });
                  dispatch(fetchPokemonsFinish());
                });
            });
        });
      });
  };
};
