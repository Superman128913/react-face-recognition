import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_SAVE_FACE_SUCCESS,
  USER_UPDATE_INTERESTS_REQUEST,
  USER_UPDATE_INTERESTS_SUCCESS,
  USER_UPDATE_INTERESTS_FAIL,
  USER_UPDATE_INTERESTS_RESET,
  SAVE_MEMBER_INFORMATION,
  SAVE_MEMBER_FACE,
  SAVE_MEMBER_AVATAR,
  SAVE_MEMBER_FAVORITES,
  SAVE_MEMBER_RESET,
  SET_USER,
  CREATE_MEMBER_FAIL,
  CREATE_MEMBER_REQUEST,
  CREATE_MEMBER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateDetailsReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const saveFaceRecognitionToLocalStorageReducer = (
  state = { faces: [] },
  action
) => {
  switch (action.type) {
    case USER_SAVE_FACE_SUCCESS:
      return { ...state, face: action.payload, success: true };
    default:
      return state;
  }
};

export const userUpdateInterests = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_INTERESTS_REQUEST:
      return { loading: true };
    case USER_UPDATE_INTERESTS_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_UPDATE_INTERESTS_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_INTERESTS_RESET:
      return {};
    default:
      return state;
  }
};

export const memberReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_MEMBER_INFORMATION:
      return { ...state, memberInfo: action.payload };

    case SAVE_MEMBER_FACE:
      return { ...state, memberFace: action.payload, success: true };

    case SAVE_MEMBER_AVATAR:
      return { ...state, memberAvatar: action.payload };

    case SAVE_MEMBER_FAVORITES:
      return { ...state, memberFavorites: action.payload };

    case SAVE_MEMBER_RESET:
      return {};

    default:
      return state;
  }
};

export const createMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MEMBER_REQUEST:
      return { loading: true };

    case CREATE_MEMBER_SUCCESS:
      return { loading: false, memberData: action.payload, success: true };

    case CREATE_MEMBER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const setUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    default:
      return state;
  }
};
