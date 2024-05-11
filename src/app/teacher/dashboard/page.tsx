'use client'
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import React, { ReactNode } from 'react';
import Link from 'next/link';

function TeacherDashboard() {
  const [dashboard,setDashboard] = useState<any>([])
  const teacherId = localStorage.getItem('teacherId')

  useEffect(()=>{
    try{
      axios.get(`http://127.0.0.1:8000/api/teacher/dashboard/${teacherId}`)
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
            <TeacherSidebar></TeacherSidebar>
          </aside>
          <section className="col-md-9">
           <div className="row">
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">Total Courses</h5>
                <div className="card-body">
                  <h3><Link href='/teacher/my-courses'>
                    {dashboard.total_teacher_courses}
                    </Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-success text-white">Total Students</h5>
                <div className="card-body">
                  <h3><Link href='/teacher/my-users'>
                    {dashboard.total_teacher_students}
                    </Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-primary">
                <h5 className="card-header bg-info text-white">Total Chapters</h5>
                <div className="card-body">
                  <h3><Link href='/teacher/my-courses'>
                    {dashboard.total_teacher_chapters}
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