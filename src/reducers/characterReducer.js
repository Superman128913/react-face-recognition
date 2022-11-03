import {
  GET_CHARACTER_FAIL,
  GET_CHARACTER_REQUEST,
  GET_CHARACTER_SUCCESS,
} from "../constants/CharacterConstants";

export const characterReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHARACTER_REQUEST:
      return { loading: true };

    case GET_CHARACTER_SUCCESS:
      return { loading: false, characters: action.payload };

    case GET_CHARACTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
