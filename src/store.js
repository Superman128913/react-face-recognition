import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateDetailsReducers,
  saveFaceRecognitionToLocalStorageReducer,
  userUpdateInterests,
  memberReducer,
  setUserReducer,
  createMemberReducer,
} from "./reducers/userReducers";

import { characterReducer } from "./reducers/characterReducer";

import { getMusicReducer } from "./reducers/musicReducer";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdate: userUpdateDetailsReducers,
  userFace: saveFaceRecognitionToLocalStorageReducer,
  userUpdateInterests: userUpdateInterests,
  memberRegister: memberReducer,
  createMember: createMemberReducer,
  setUser: setUserReducer,
  charactersData: characterReducer,
  allMusics: getMusicReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userFaceFromStorage = localStorage.getItem("userFace")
  ? JSON.parse(localStorage.getItem("userFace"))
  : null;

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  userFace: {
    faces: userFaceFromStorage,
  },
  setUser: {
    user: userFromStorage,
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
