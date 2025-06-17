import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { getResultByExamId, getYearByExamId } from '../../Actions/examAction';
import { getAllUser } from '../../Actions/userAction';
import Loader from '../Loader';
import Error from '../Error';
import { Table } from 'react-bootstrap';
import ResultData from './ResultData';

function Results(exam_id) {
  const dispatch = useDispatch();
  const resultdata = useSelector((state) => state.getResultByExamIdReducer);
  const { Result } = resultdata;
  // console.log(Result)
  // const userData = useSelector((state) => state.getUsersByIdReducer);
  // const { students, loading, error } = userData;
  const userData = useSelector((state) => state.getAllUserReducer);
  const { users, loading, error } = userData;
  const yearData = useSelector((state)=> state.getYearByExamIdReducer);
  const {year} = yearData;
  const [sortedStudents, setSortedStudents] = useState([]);
  // console.log(Result)
  useEffect(() => {
    dispatch(getResultByExamId(exam_id));
    dispatch(getYearByExamId(exam_id));
  }, []);

  useEffect(() => {
    if (Result != null) {
      // const user_ids = Result.map((result) => result.user_id);
      // dispatch(getUsersById(user_ids));
      dispatch(getAllUser());
    }
  }, [Result,dispatch]);

  // useEffect(() => {
  //   if (students.length > 0) {
  //     const sorted = [...students].sort((a, b) => a.registration_no - b.registration_no);
  //     setSortedStudents(sorted);
  //   }
  // }, [students]);
  useEffect(() => {
    if (users.length > 0 && year !== undefined) {

      const Users = users.filter((user)=> user.year === year.year)

      const sorted = [...Users].sort((a, b) => a.registration_no - b.registration_no);
      setSortedStudents(sorted);
    }
  }, [users,year]);

  return (
    <>
      <div>
        {loading && <Loader />}
        {error && <Error />}

        <div style={{paddingLeft:"2rem",paddingRight:"2rem",paddingTop:"2rem"}}>
          <Table responsive>
            <thead>
              <tr>
                <th>Name Of Student</th>
                <th>Registration No</th>
                <th>Mark</th>
                <th>Window Switching Count</th>
                <th>Review Answers</th>
              </tr>
            </thead>
            <tbody>
              {Result && sortedStudents.map((student) => {
                const res = Result.find((result) => result.user_id === student._id);
                {/* console.log(res) */}
                const percentage = res !== undefined ? res.percentage !== undefined ? res.percentage : null : null; 
               
                const answers = res !== undefined ? res.answers !== undefined ? res.answers : null : null; 

                const s_count = res !== undefined ? res.s_count !== undefined ? res.s_count : null : null; 

                return (
                  <ResultData key={student._id} student={student} s_count={s_count} answers={answers} exam_id={exam_id} percentage={percentage} />
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Results;
