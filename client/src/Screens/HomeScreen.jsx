import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import UserHome from '../Components/User/UserHome';

function HomeScreen() {

  const data = sessionStorage.getItem('userData')

  const [currentUser, setCurrentUser] = useState(null);
  // console.log(currentUser)

  useEffect(()=>{
    if(data){
      setCurrentUser(JSON.parse(data))
    }
  },[data]);


  return (
    <>
     <div className='homescreen' style={{ textAlign :"center"}} >
     {currentUser !==null? 
      (
        <div>
          {/* <h1>Welcome {currentUser.name}</h1> */}
          {currentUser.isAdmin===true ? (<h4>Go To Admin Pannel <Link to={"/admin/dashboard"}>click me!</Link></h4>) : <UserHome/> }
        </div>
      ) 
      :
       (<div  style={{ textAlign :"center",textShadow:"2px 3px 4px black",color:"white"}}>
        <h1>Welcome to ODISHA ADARSHA VIDYALAYA Exam Protal</h1>
      <h4>Please Login to continue...</h4>
      </div>) }
     </div>
    </>
  )
}

export default HomeScreen

