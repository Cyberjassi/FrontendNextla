import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';

function Sidebar() {
  const [notifData,setnotifData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  useEffect(()=>{
    try{
      axios.get(`http://127.0.0.1:8000/api/student/fetch-all-notification/${studentId}`)
      .then((res)=>{
        setnotifData(res.data);
      })
    }catch(error){
      console.log(error);
    }
  },[])
  console.log("here the data for notification",notifData)
  return (
    <div className="card">
            
            <div className="list-group list-group-flush">
            <Link
                href="/student/dashboard"
                className="list-group-item list-group-item-action"
              >
                Dashboard
              </Link>
              <Link
                href="/student/my-courses"
                className="list-group-item list-group-item-action"
              >
                My Courses
              </Link>
              <Link
                href="/student/favorite-courses"
                className="list-group-item list-group-item-action"
              >
                Favorite Courses
              </Link>
              <Link
                href="/student/recommended-courses"
                className="list-group-item list-group-item-action"
              >
                Recommended Courses
              </Link>
              <Link
                href="/student/assignments"
                className="list-group-item list-group-item-action"
              >
                Assignment
                {notifData.length !==0 &&
                <span className='float-end badge bg-danger mt-1'>{notifData.length}</span>}
              </Link>
              <Link
                href="/student/profile-settings"
                className="list-group-item list-group-item-action"
              >
            
                Profile Settings
              </Link>
              <Link
                href="/student/change-password"
                className="list-group-item list-group-item-action"
              >
                Change Password
              </Link>
              <Link
                href="/student/logout"
                className="list-group-item list-group-item-action text-danger"
              >
                Logout
              </Link>
            </div>
          </div>
  )
}

export default Sidebar
