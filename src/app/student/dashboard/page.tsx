'use client'
import UserSidebar from "@/components/student/UserSidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import React, { ReactNode } from 'react';
import Link from 'next/link';

function TeacherDashboard() {
  const [dashboard,setDashboard] = useState<any>([])
  const studentId = localStorage.getItem('studentId')

  useEffect(()=>{
    try{
      axios.get(`http://127.0.0.1:8000/api/student/dashboard/${studentId}`)
      .then((res:any)=>{
        console.log(res);
        setDashboard(res.data)
      });
    }catch(error){
      console.log(error)
    }
  },[]);
console.log("this is data from dashboard",dashboard)
    return (
      <div className="container mt-4">
        <div className="row">
          <aside className="col-md-3">
            <UserSidebar></UserSidebar>
          </aside>
          <section className="col-md-9">
           <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                <div className="card-body">
                  <h3><Link href='/student/my-courses'>
                    {dashboard.enrolled_courses}
                    </Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-success text-white">Favorite Courses</h5>
                <div className="card-body">
                  <h3><Link href='/student/favorite-courses'>
                    {dashboard.favorite_courses}
                    </Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-info text-white">Complete Assignments</h5>
                <div className="card-body">
                  <h3><Link href='/student/assignments'>
                    {dashboard.complete_assignments}
                    </Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-danger text-white">Pending Assignments</h5>
                <div className="card-body">
                  <h3><Link href='/student/assignments'>
                    {dashboard.pending_assignments}
                    </Link></h3>
                </div>
              </div>
            </div>
           </div>
          </section>
        </div>
      </div>
    );
  }
  
  export default TeacherDashboard;