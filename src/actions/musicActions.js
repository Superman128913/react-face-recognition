import {
  GET_MUSIC_SUCCESS,
  GET_MUSIC_REQUEST,
  GET_MUSIC_FAIL,
} from "../constants/musicConstants";
import { client } from "../services/client";

export const getMusics = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MUSIC_REQUEST,
    });
    const { data } = await client.get("/api/music/");
    dispatch({
      type: GET_MUSIC_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MUSIC_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
