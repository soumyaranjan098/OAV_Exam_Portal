import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Screens/Login";
import Register from "./Components/Admin/Register";
import LoadingScreen from "./Screens/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import AllStudents from "./Components/Admin/AllStudents";
import CreateQuestionForm from "./Components/Admin/CreateQuestion";
import CreateExam from "./Components/Admin/CreateExam";
import AdminScreen from "./Screens/AdminScreen";
import NavBar from "./Components/NavBar";
import PrivateRoutes from "./PrivateRoutes";
import ExamPage from "./Components/Admin/ExamPage";
import AllExam from "./Components/Admin/AllExam";
import HomeScreen from "./Screens/HomeScreen";
import ExaminationPage from "./Components/User/ExaminationPage";
import SExamPage from "./Components/Admin/subjective/SExamPage";
import SubExaminationPage from "./Components/User/SubExaminationPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    // Simulate a loading delay
    const timeout = setTimeout(() => {
      dispatch({ type: "SET_LOADING", payload: false });
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* <ProtectedRoute exact path='/data' component={<AllStudents/>}/> */}
            <Route exact path="/admin" element={<PrivateRoutes />}>
              <Route exact path="dashboard" element={<AdminScreen />} />
              <Route exact path="userlist" element={<AllStudents />} />
              <Route exact path="createExam" element={<CreateExam />} />
              <Route exact path="allExam" element={<AllExam />} />
              <Route
                exact
                path="createQuestions"
                element={<CreateQuestionForm />}
              />
              <Route
                exact
                path="dashboard/exampage/:exam_id"
                element={<ExamPage />}
              />
              <Route
                exact
                path="dashboard/sexampage/:exam_id"
                element={<SExamPage />}
              />
            </Route>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/home" element={<HomeScreen />} />
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path='/register' element={<Register/>}/> */}
            <Route
              exact
              path="/examination/:exam_id"
              element={<ExaminationPage />}
            />
            <Route
              exact
              path="/sexamination/:exam_id"
              element={<SubExaminationPage />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
