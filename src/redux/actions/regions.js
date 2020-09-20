import {FETCH_REGIONS} from '../utils/actions';

export const fetchRegions = () => {
  const API_URL = 'https://pokeapi.co/api/v2/region/';
  return async (dispatch) => {
    const response = await fetch(API_URL);

    const resData = await response.json();

    dispatch({
      type: FETCH_REGIONS,
      regions: resData.results,
    });
  };
};
