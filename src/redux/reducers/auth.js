import {AUTHENTICATE, LOGOUT} from '../utils/actions';

const initialState = {
  userData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userData: action.userData,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
