import {
  GET_MUSIC_FAIL,
  GET_MUSIC_REQUEST,
  GET_MUSIC_SUCCESS,
} from "../constants/musicConstants";

export const getMusicReducer = (state = { musics: [] }, action) => {
  switch (action.type) {
    case GET_MUSIC_REQUEST:
      return { loading: true };

    case GET_MUSIC_SUCCESS:
      return { loading: false, musics: action.payload };

    case GET_MUSIC_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
