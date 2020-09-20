import {AUTHENTICATE, DID_TRY_AL, LOGOUT} from '../utils/actions';

export const authenticate = (userData) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, userData});
  };
};

export const logout = () => {
  return {type: LOGOUT};
};
