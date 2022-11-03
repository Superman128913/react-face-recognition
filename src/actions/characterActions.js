import {
  GET_CHARACTER_REQUEST,
  GET_CHARACTER_FAIL,
  GET_CHARACTER_SUCCESS,
} from "../constants/CharacterConstants";
import { client } from "../services/client";

export const getCharacters = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHARACTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await client.get("/api/conditions/", config);

    dispatch({
      type: GET_CHARACTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHARACTER_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
