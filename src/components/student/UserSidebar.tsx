import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import "./usersidebar.module.css"
import logout from '@/app/(Auth)/logout/logout';


function Sidebar() {
  const [notifData,setnotifData] = useState([]);
  const studentId = localStorage.getItem('studentId');
  useEffect(()=>{
    try{
      axios.get(`${process.env.BASE_URL}student/fetch-all-notification/${studentId}`)
      .then((res)=>{
        setnotifData(res.data);
      })
    }catch(error){
      console.log(error);
    }
  },[])
  console.log("here the data for notification",notifData)
  return (
    <div className="card shadow">
      <div className="list-group">
        <Link href="/student/dashboard" className="list-group-item list-group-item-action">
          Dashboard
        </Link>
        <Link href="/student/my-courses" className="list-group-item list-group-item-action">
          My Courses
        </Link>
        <Link href="/student/my-teachers" className="list-group-item list-group-item-action">
          My Teachers
        </Link>
        <Link href="/student/favorite-courses" className="list-group-item list-group-item-action">
          Favorite Courses
        </Link>
        <Link href="/student/recommended-courses" className="list-group-item list-group-item-action">
          Recommended Courses
        </Link>
        <Link href="/student/assignments" className="list-group-item list-group-item-action">
          Assignment
          {notifData.length !== 0 && <span className='float-end badge bg-danger mt-1'>{notifData.length}</span>}
        </Link>
        <Link href="/student/profile-settings" className="list-group-item list-group-item-action">
          Profile Settings
        </Link>
        <Link href="/student/change-password" className="list-group-item list-group-item-action">
          Change Password
        </Link>
        <button className="list-group-item list-group-item-action text-danger" onClick={()=>logout()}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar
