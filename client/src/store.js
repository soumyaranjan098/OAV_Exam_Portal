import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  registerUserReducer,
  loadingReducer,
  getAllUserReducer,
  loginUserReducer,
  logoutUserReducer,
  authReducer,
  getUsersByIdReducer,
  updateUserReducer,
  deleteUserReducer,
} from "./Reducers/userReducer";
import {
  getExamReducer,
  getAllQuestionsReducer,
  getExamByIdReducer,
  getResultByExamIdReducer,
  getResultByUserIdsReducer,
  getAllExamsByYearReducer,
  getYearByExamIdReducer,
  deleteExamByIdReducer,
  deleteQuestionByIdReducer,
  updateQuestionByIdReducer,
  updateIsActiveReducer,
  updateExamByIDReducer,
  getAllSUBExamsByYearReducer,
  getAllSUBQuestionsReducer,
  getSUBExamByIdReducer,
  getSUBExamReducer,
  deleteSubExamByIdReducer,
  updateSubExamByIDReducer,
  updateSubIsActiveReducer,
  updateSubShortQuestionByIdReducer,
  updateSubLongQuestionByIdReducer,
  deleteSubLongQuestionByIdReducer,
  deleteSubShortQuestionByIdReducer,
  getSubResultByExamIdReducer,
  getSubResultByUserIdsReducer,
  getSubYearByExamIdReducer,
  setSubMarkReducer
} from "./Reducers/examReducer";

const user =
  sessionStorage.getItem("userData") !== null || undefined ? true : false;
const token =
  sessionStorage.getItem("userData") !== null || undefined
    ? sessionStorage.getItem("userData")
    : null;
// const token = Cookies.get('jwtoken')
// console.log(token)
const rootReducer = combineReducers({
  registerUserReducer: registerUserReducer,
  loadingReducer: loadingReducer,
  getAllUserReducer: getAllUserReducer,
  loginUserReducer: loginUserReducer,
  logoutUserReducer: logoutUserReducer,
  authReducer: authReducer,
  getExamReducer: getExamReducer,
  getAllQuestionsReducer: getAllQuestionsReducer,
  getExamByIdReducer: getExamByIdReducer,
  getResultByExamIdReducer: getResultByExamIdReducer,
  getUsersByIdReducer: getUsersByIdReducer,
  getResultByUserIdsReducer: getResultByUserIdsReducer,
  getAllExamsByYearReducer: getAllExamsByYearReducer,
  getYearByExamIdReducer: getYearByExamIdReducer,
  deleteExamByIdReducer: deleteExamByIdReducer,
  updateUserReducer: updateUserReducer,
  deleteUserReducer: deleteUserReducer,
  deleteQuestionByIdReducer: deleteQuestionByIdReducer,
  updateQuestionByIdReducer: updateQuestionByIdReducer,
  updateIsActiveReducer: updateIsActiveReducer,
  updateExamByIDReducer: updateExamByIDReducer,
  getAllSUBExamsByYearReducer: getAllSUBExamsByYearReducer,
  getAllSUBQuestionsReducer: getAllSUBQuestionsReducer,
  getSUBExamByIdReducer: getSUBExamByIdReducer,
  getSUBExamReducer: getSUBExamReducer,
  deleteSubExamByIdReducer: deleteSubExamByIdReducer,
  updateSubExamByIDReducer: updateSubExamByIDReducer,
  updateSubIsActiveReducer: updateSubIsActiveReducer,
  deleteSubLongQuestionByIdReducer: deleteSubLongQuestionByIdReducer,
  deleteSubShortQuestionByIdReducer: deleteSubShortQuestionByIdReducer,
  updateSubShortQuestionByIdReducer: updateSubShortQuestionByIdReducer,
  updateSubLongQuestionByIdReducer: updateSubLongQuestionByIdReducer,
  getSubResultByUserIdsReducer: getSubResultByUserIdsReducer,
  getSubResultByExamIdReducer: getSubResultByExamIdReducer,
  getSubYearByExamIdReducer: getSubYearByExamIdReducer,
  setSubMarkReducer : setSubMarkReducer
});

const initilState = {
  loginUserReducer: {
    token: token,
  },
  authReducer: {
    isAuthenticated: user,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initilState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
