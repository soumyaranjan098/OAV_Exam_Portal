import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  getSubResultByExamId,
  getSubYearByExamId,
} from "../../../Actions/examAction";
import { getAllUser } from "../../../Actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import SResultData from "./SResultData";

function SResult(exam_id) {
  const dispatch = useDispatch();
  const resultdata = useSelector((state) => state.getSubResultByExamIdReducer);
  const { Result } = resultdata;
  const userData = useSelector((state) => state.getAllUserReducer);
  const { users, loading, error } = userData;
  const yearData = useSelector((state) => state.getSubYearByExamIdReducer);
  const { year } = yearData;
  const resd = useSelector((state)=> state.setSubMarkReducer);
  const {success} = resd;
  const [sortedStudents, setSortedStudents] = useState([]);
  // console.log(Result);
  useEffect(() => {
    dispatch(getSubResultByExamId(exam_id));
    dispatch(getSubYearByExamId(exam_id));
  }, [success]);

  useEffect(() => {
    if (Result != null) {
      dispatch(getAllUser());
    }
  }, [Result, dispatch]);

  useEffect(() => {
    if (users.length > 0 && year !== undefined) {
      const Users = users.filter((user) => user.year === year.year);

      const sorted = [...Users].sort(
        (a, b) => a.registration_no - b.registration_no
      );
      setSortedStudents(sorted);
    }
  }, [users, year]);
  return (
    <>
      <div>
        {/* {loading && <Loader />}
        {error && <Error />} */}

        <div
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "2rem",
          }}
        >
          <Table responsive>
            <thead>
              <tr>
                <th>Name Of Student</th>
                <th>Registration No</th>
                <th>Mark</th>
                <th>Window Switching Count</th>
                <th>Check Answers</th>
              </tr>
            </thead>
            <tbody>
              {Result &&
                sortedStudents.map((student) => {
                  const res = Result.find(
                    (result) => result.user_id === student._id
                  );
                  {/* {
                    console.log(res); 
                  } */}
                  const Rid = 
                    res!== undefined ? res._id !== undefined ? res._id : null : null;
                  const percentage =
                    res !== undefined
                      ? res.percentage !== undefined
                        ? res.percentage
                        : null
                      : null;

                  const sanswers =
                    res !== undefined
                      ? res.short_q_answers !== undefined
                        ? res.short_q_answers
                        : null
                      : null;

                  const lanswers =
                    res !== undefined
                      ? res.long_q_answers !== undefined
                        ? res.long_q_answers
                        : null
                      : null;

                  const s_count =
                    res !== undefined
                      ? res.s_count !== undefined
                        ? res.s_count
                        : null
                      : null;

                  return (
                    <SResultData
                      key={student._id}
                      student={student}
                      s_count={s_count}
                      sanswers={sanswers}
                      lanswers={lanswers}
                      exam_id={exam_id}
                      percentage={percentage}
                      resId = {Rid}
                    />
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default SResult;
