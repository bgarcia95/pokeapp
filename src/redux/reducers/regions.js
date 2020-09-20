import {FETCH_REGIONS} from '../utils/actions';

const initialState = {
  regions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGIONS:
      return {
        regions: action.regions,
      };

    default:
      return state;
  }
};
