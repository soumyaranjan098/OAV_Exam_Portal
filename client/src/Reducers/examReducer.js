import { errorReducer } from "./userReducer";

export const getExamReducer = (state = { exam: [] }, action) => {
  switch (action.type) {
    case "GET_ALLEXAMS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLEXAMS_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_ALLEXAMS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllExamsByYearReducer = (state = { exam: [] }, action) => {
  switch (action.type) {
    case "GET_ALLEXAMSBYYEAR_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLEXAMSBYYEAR_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_ALLEXAMSBYYEAR_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllQuestionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case "GET_ALLQUESTIONS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLQUESTIONS_SUCCESS":
      return {
        Questions: action.payload,
        loading: false,
      };
    case "GET_ALLQUESTIONS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getExamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_EXAMBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_EXAMBYID_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_EXAMBYID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getYearByExamIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_YEARBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_YEARBYID_SUCCESS":
      return {
        year: action.payload,
        loading: false,
      };
    case "GET_YEARBYID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getResultByExamIdReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case "GET_RESULTBYEXAMID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_RESULTBYEXAMID_SUCCESS":
      return {
        Result: action.payload,
        loading: false,
      };
    case "GET_RESULTBYEXAMID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getResultByUserIdsReducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case "GET_RESULTBYUSERIDS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_RESULTBYUSERIDS_SUCCESS":
      return {
        Results: action.payload,
        loading: false,
      };
    case "GET_RESULTBYUSERIDS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteExamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_EXAM_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "DELETE_EXAM_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "DELETE_EXAM_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

// ////////////////////// Update Question //////////////////////

export const updateQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATE_QUESTION_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATE_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

export const deleteQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "DELETE_QUESTION_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "DELETE_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const updateIsActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATEISACTIVE_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATEISACTIVE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATEISACTIVE_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

export const updateExamByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_EXAMBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATE_EXAMBYID_SUCCESS":
      return {
        loading: false,
        succ: true,
      };
    case "UPDATE_EXAMBYID_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

///////////////////// Reducer For Subjective exam///////////////////////////////////

export const getSUBExamReducer = (state = { exam: [] }, action) => {
  switch (action.type) {
    case "GET_ALLSUBEXAMS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLSUBEXAMS_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_ALLSUBEXAMS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllSUBExamsByYearReducer = (state = { exam: [] }, action) => {
  switch (action.type) {
    case "GET_ALLSUBEXAMSBYYEAR_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLSUBEXAMSBYYEAR_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_ALLSUBEXAMSBYYEAR_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getAllSUBQuestionsReducer = (
  state = { questions: [] },
  action
) => {
  switch (action.type) {
    case "GET_ALLSUBQUESTIONS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_ALLSUBQUESTIONS_SUCCESS":
      return {
        Questions: action.payload,
        loading: false,
      };
    case "GET_ALLSUBQUESTIONS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getSUBExamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SUBEXAMBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_SUBEXAMBYID_SUCCESS":
      return {
        Allexam: action.payload,
        loading: false,
      };
    case "GET_SUBEXAMBYID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};
//
export const deleteSubExamByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_SUBEXAM_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "DELETE_SUBEXAM_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "DELETE_SUBEXAM_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

// ////////////////////// Update Question //////////////////////

export const updateSubShortQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUB_SHORT_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATE_SUB_SHORT_QUESTION_SUCCESS":
      return {
        loading: false,
        ssuccess: true,
      };
    case "UPDATE_SUB_SHORT_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

// ////////////////////// Update Long Question //////////////////////

export const updateSubLongQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUB_LONG_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATE_SUB_LONG_QUESTION_SUCCESS":
      return {
        loading: false,
        lsuccess: true,
      };
    case "UPDATE_SUB_LONG_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

/////////////////////// Delete Short Question By Id /////////////////
export const deleteSubShortQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_SUB_SHORT_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "DELETE_SUB_SHORT_QUESTION_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "DELETE_SUB_SHORT_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

/////////////////  Delete Long Questions By Id /////////////////////

export const deleteSubLongQuestionByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_SUB_LONG_QUESTION_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "DELETE_SUB_LONG_QUESTION_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "DELETE_SUB_LONG_QUESTION_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const updateSubIsActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATESUBISACTIVE_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATESUBISACTIVE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATESUBISACTIVE_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

export const updateSubExamByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUBEXAMBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "UPDATE_SUBEXAMBYID_SUCCESS":
      return {
        loading: false,
        succ: true,
      };
    case "UPDATE_SUBEXAMBYID_FAIL":
      return {
        ...errorReducer(state, action),
        loading: false,
        // error: action.payload
      };
    default:
      return { state };
  }
};

export const getSubYearByExamIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SUBYEARBYID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_SUBYEARBYID_SUCCESS":
      return {
        year: action.payload,
        loading: false,
      };
    case "GET_SUBYEARBYID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getSubResultByExamIdReducer = (
  state = { results: [] },
  action
) => {
  switch (action.type) {
    case "GET_SUBRESULTBYEXAMID_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_SUBRESULTBYEXAMID_SUCCESS":
      return {
        Result: action.payload,
        loading: false,
      };
    case "GET_SUBRESULTBYEXAMID_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};

export const getSubResultByUserIdsReducer = (
  state = { results: [] },
  action
) => {
  switch (action.type) {
    case "GET_SUBRESULTBYUSERIDS_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "GET_SUBRESULTBYUSERIDS_SUCCESS":
      return {
        Results: action.payload,
        loading: false,
      };
    case "GET_SUBRESULTBYUSERIDS_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};


export const setSubMarkReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case "SET_SUBMARK_REQUEST":
      return {
        ...errorReducer(state, action),
        loading: true,
      };
    case "SET_SUBMARK_SUCCESS":
      return {
        success: true,
        loading: false,
      };
    case "GET_SUBMARK_ERROR":
      return {
        ...errorReducer(state, action),
        loading: false,
      };
    default:
      return state;
  }
};