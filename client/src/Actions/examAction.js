import axios from "axios";
import { errorActionCreator } from "./userAction";
export const getAllExams = () => async (dispatch) => {
  dispatch({ type: "GET_ALLEXAMS_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_ALLEXAMS_SUCCESS", payload: res.data });
  };

  return await axios
    .get("/api/exam/getAllExams")
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_ALLEXAMS_ERROR", err }));
    });
};
////////////////// Get Allexams By Year / //////////////
export const getAllExamsByYear = () => async (dispatch) => {
  dispatch({ type: "GET_ALLEXAMSBYYEAR_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_ALLEXAMSBYYEAR_SUCCESS", payload: res.data });
  };

  return await axios
    .get("/api/exam/getAllExamsByYear")
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_ALLEXAMSBYYEAR_ERROR", err }));
    });
};

export const getAllQuestions = (exam_id) => async (dispatch) => {
  //    console.log(exam_id)
  dispatch({ type: "GET_ALLQUESTIONS_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res.data)
    dispatch({ type: "GET_ALLQUESTIONS_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/question/getAllQuestions", exam_id)
    .then(successHandler)
    .catch((error) => {
      dispatch(errorActionCreator({ type: "GET_ALLQUESTIONS_ERROR", error }));
    });
};

export const getExamById = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_EXAMBYID_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_EXAMBYID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/exam/getExamByID", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_EXAMBYID_ERROR", err }));
    });
};

export const getYearByExamId = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_YEARBYID_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_YEARBYID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/exam/getYearByID", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_YEARBYID_ERROR", err }));
    });
};

//Get the Result of a specific user....

export const getResultByUserIds = (exam_id) => async (dispatch) => {
  //  console.log(exam_id)
  dispatch({ type: "GET_RESULTBYUSERIDS_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res)
    dispatch({ type: "GET_RESULTBYUSERIDS_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/result/getResultByUserIds", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_RESULTBYUSERIDS_ERROR", err }));
    });
};

export const getResultByExamId = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_RESULTBYEXAMID_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res.data)
    dispatch({ type: "GET_RESULTBYEXAMID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/result/getResultByExamId", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_RESULTBYEXAMID_ERROR", err }));
    });
};

export const deleteExamById = (id) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "DELETE_EXAM_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "DELETE_EXAM_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/deleteByID", id)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("DELETE_EXAM_FAIL", error));
    });
};

export const deleteQuestionById = (id) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "DELETE_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "DELETE_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/deleteQuestion", id)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("DELETE_QUESTION_FAIL", error));
    });
};

export const updateQuestionById = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATE_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATE_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/updateQuestion", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATE_QUESTION_FAIL", error));
    });
};

export const updateIsActive = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATEISACTIVE_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATEISACTIVE_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/updateIsActive", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATEISACTIVE_FAIL", error));
    });
};

export const updateExamByID = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATE_EXAMBYID_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATE_EXAMBYID_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/updateExam", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATE_EXAMBYID_FAIL", error));
    });
};

//////////////////// Actions For Subjective Exams  /////////////////////

export const getAllSubExams = () => async (dispatch) => {
  dispatch({ type: "GET_ALLSUBEXAMS_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_ALLSUBEXAMS_SUCCESS", payload: res.data });
  };

  return await axios
    .get("/api/exam/getAllSubExams")
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_ALLSUBEXAMS_ERROR", err }));
    });
};

////////////////// Get Allexams By Year / //////////////
export const getAllSUBExamsByYear = () => async (dispatch) => {
  dispatch({ type: "GET_ALLSUBEXAMSBYYEAR_REQUEST" });

  const successHandler = (res) => {
    // console.log(res);
    dispatch({ type: "GET_ALLSUBEXAMSBYYEAR_SUCCESS", payload: res.data });
  };

  return await axios
    .get("/api/exam/getAllSubExamsByYear")
    .then(successHandler)
    .catch((err) => {
      dispatch(
        errorActionCreator({ type: "GET_ALLSUBEXAMSBYYEAR_ERROR", err })
      );
    });
};

export const getAllSUBQuestions = (exam_id) => async (dispatch) => {
  //    console.log(exam_id)
  dispatch({ type: "GET_ALLSUBQUESTIONS_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res.data)
    dispatch({ type: "GET_ALLSUBQUESTIONS_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/question/getAllSubQuestions", exam_id)
    .then(successHandler)
    .catch((error) => {
      dispatch(
        errorActionCreator({ type: "GET_ALLSUBQUESTIONS_ERROR", error })
      );
    });
};

export const getSUBExamById = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_SUBEXAMBYID_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_SUBEXAMBYID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/exam/getSubExamById", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_SUBEXAMBYID_ERROR", err }));
    });
};

export const deleteSubExamById = (id) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "DELETE_SUBEXAM_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "DELETE_SUBEXAM_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/deleteSubEByID", id)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("DELETE_SUBEXAM_FAIL", error));
    });
};

/////////////////// Delete Short Question By ID ////////////////////

export const deleteSubShortQuestionById = (id) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "DELETE_SUB_SHORT_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "DELETE_SUB_SHORT_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/deleteShortQuestion", id)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("DELETE_SUB_SHORT_QUESTION_FAIL", error));
    });
};

///////////////// Delete Long Question By Id ////////////////

export const deleteSubLongQuestionById = (id) => async (dispatch) => {
  // const navigate = useNavigate();
  dispatch({ type: "DELETE_SUB_LONG_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "DELETE_SUB_LONG_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/deleteLongQuestion", id)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("DELETE_SUB_LONG_QUESTION_FAIL", error));
    });
};

//////////////////// update Short Question /////////////////
export const updateSubShortQuestionById = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATE_SUB_SHORT_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATE_SUB_SHORT_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/updateShortQuestion", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATE_SUB_SHORT_QUESTION_FAIL", error));
    });
};

//////////////////// update Long Question /////////////////
export const updateSubLongQuestionById = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATE_SUB_LONG_QUESTION_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATE_SUB_LONG_QUESTION_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/question/updateLongQuestion", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATE_SUB_LONG_QUESTION_FAIL", error));
    });
};

export const updateSubIsActive = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATESUBISACTIVE_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATESUBISACTIVE_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/updateSubIsActive", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATESUBISACTIVE_FAIL", error));
    });
};

export const updateSubExamByID = (data) => async (dispatch) => {
  // const navigate = useNavigate();
  // console.log(data);
  dispatch({ type: "UPDATE_SUBEXAMBYID_REQUEST" });

  const successHandler = () => {
    dispatch({ type: "UPDATE_SUBEXAMBYID_SUCCESS" });
  };
  // console.log(id)

  return await axios
    .post("/api/exam/updateSubExam", data)
    .then(successHandler)
    .catch((error) => {
      // Deal with the error
      dispatch(errorActionCreator("UPDATE_SUBEXAMBYID_FAIL", error));
    });
};

export const getSubYearByExamId = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_SUBYEARBYID_REQUEST" });

  const successHandler = (res) => {
    // console.log(res)
    dispatch({ type: "GET_SUBYEARBYID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/exam/getSubYearByID", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(errorActionCreator({ type: "GET_SUBYEARBYID_ERROR", err }));
    });
};

export const getSubResultByUserIds = (exam_id) => async (dispatch) => {
  //  console.log(exam_id)
  dispatch({ type: "GET_SUBRESULTBYUSERIDS_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res)
    dispatch({ type: "GET_SUBRESULTBYUSERIDS_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/result/getSubResultByUserIds", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(
        errorActionCreator({ type: "GET_SUBRESULTBYUSERIDS_ERROR", err })
      );
    });
};

export const getSubResultByExamId = (exam_id) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "GET_SUBRESULTBYEXAMID_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res.data)
    dispatch({ type: "GET_SUBRESULTBYEXAMID_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/result/getSubResultByExamId", exam_id)
    .then(successHandler)
    .catch((err) => {
      dispatch(
        errorActionCreator({ type: "GET_SUBRESULTBYEXAMID_ERROR", err })
      );
    });
};


export const setSubMark = (data) => async (dispatch) => {
  // console.log(exam_id)
  dispatch({ type: "SET_SUBMARK_REQUEST" });

  const successHandler = (res) => {
    //  console.log(res.data)
    dispatch({ type: "SET_SUBMARK_SUCCESS", payload: res.data });
  };

  return await axios
    .post("/api/result/setSubMarks", data)
    .then(successHandler)
    .catch((err) => {
      dispatch(
        errorActionCreator({ type: "GET_SUBMARK_ERROR", err })
      );
    });
};
