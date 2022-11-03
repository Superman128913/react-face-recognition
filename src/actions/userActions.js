import { bindActionCreators } from "redux";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SAVE_FACE_SUCCESS,
  USER_SAVE_FACE_REQUEST,
  USER_SAVE_FACE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_INTERESTS_REQUEST,
  USER_UPDATE_INTERESTS_SUCCESS,
  USER_UPDATE_INTERESTS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  SAVE_MEMBER_INFORMATION,
  SAVE_MEMBER_FAVORITES,
  SAVE_MEMBER_FACE,
  SAVE_MEMBER_AVATAR,
  SET_USER,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
} from "../constants/userConstants";
import { client } from "../services/client";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
      },
      config
    );
    if (status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "نام کاربری یا رمز عبور اشتباه است",
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const register =
  (
    username,
    password,
    name,
    lastName,
    city,
    phoneNumber,
    gender,
    birth_day_date,
    character = "faraz"
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        validateStatus: () => true,
      };
      const { data, status } = await client.post(
        "/api/users/register/",
        {
          username: username,
          password: password,
        },
        config
      );
      if (status == 200) {
        const result = await client.patch(
          "/api/users/profile_update/",
          {
            name,
            lastName,
            city,
            phoneNumber,
            gender,
            birth_day_date,
            character,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${data.access}`,
            },
          }
        );

        if (result.status === 200) {
          const { data: profileData } = await client.get(
            "/api/users/profile/",
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${data.access}`,
              },
            }
          );
          dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: profileData,
          });

          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: profileData,
          });
          localStorage.setItem("userInfo", JSON.stringify(profileData));
          localStorage.setItem("token", JSON.stringify(data.access));
        } else {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: "با خطا مواجه شد لطفا دوباره تلاش کنید",
          });
        }
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: "با خطا مواجه شد لطفا دوباره تلاش کنید",
        });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.details,
      });
    }
  };

export const saveFaceRecognitionToLocalStorage =
  (data) => (dispatch, getState) => {
    dispatch({
      type: USER_SAVE_FACE_SUCCESS,
      payload: data,
    });
    const {
      userFace: { faces },
    } = getState();
    const jsonData = JSON.stringify(data);
    localStorage.setItem("userFace", jsonData);
  };

export const updateUserDetails = (character) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await client.patch(
      "/api/users/profile_update/",
      {
        character,
      },
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const updateUserInterests = (interests) => async (dispatch) => {
  try {
    dispatch({
      type: USER_UPDATE_INTERESTS_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await client.patch(
      "/api/users/profile_update/interests/",
      interests,
      config
    );

    dispatch({
      type: USER_UPDATE_INTERESTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_INTERESTS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const getUserProfileData = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await client.get("/api/users/profile/", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const saveMemberInformation = (data) => (dispatch) => {
  dispatch({
    type: SAVE_MEMBER_INFORMATION,
    payload: data,
  });
  localStorage.setItem("memberInfo", JSON.stringify(data));
};

export const saveMemberFace = (data) => (dispatch, getState) => {
  const {
    userFace: { faces },
  } = getState();
  dispatch({
    type: SAVE_MEMBER_FACE,
    payload: data,
  });

  const newFace = JSON.stringify(data);
  const faceData = JSON.stringify(faces);
  localStorage.setItem("userFace", [faceData, newFace]);
};

export const saveMemberAvatar = (data) => (dispatch) => {
  dispatch({
    type: SAVE_MEMBER_AVATAR,
    payload: data,
  });
  localStorage.setItem("memberAvatar", JSON.stringify(data));
};

export const setUserWithFacerRecognition = (data) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: data,
  });
  localStorage.setItem("user", JSON.stringify(data));
};

export const createMember = (dataToSend) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MEMBER_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await client.post(
      "/api/users/createMember/",
      dataToSend,
      config
    );
    dispatch({
      type: CREATE_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
