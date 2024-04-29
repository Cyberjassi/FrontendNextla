"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";

import { getCourseInfo } from "@/app/redux/Course/CourseRetreieve";
import { useDispatch, useSelector } from "react-redux";


function TeacherMyCourses() {
  const [course,setCourse] = useState<any>([])

  // to get teacher id from local storage---
  const teacherId = localStorage.getItem('teacherId')
  console.log("this is teacher id",teacherId)

  const dispatch = useDispatch()

  useEffect (()=>{
    dispatch(getCourseInfo())
  },[dispatch])
  
  const state = useSelector((state:any)=>state);
  console.log("this is my data",state.course.data)
  const courseData = state.course.data


 
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.course.isLoading ? (
                    <p>Loading....</p>
                  ):(courseData&&
                    courseData.map((course:any,index:any)=>(
                 <tr key={index} >
                    <td><Link href={`chapter/${course.id}`}>{course.title}</Link></td>
                    <td><img src={course.featured_img} width="80" className="rounded" alt={course.title} /></td>
                    <td>
                      <Link href="/">123</Link>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm  ms-2">Delete</button>
                      <Link className="btn btn-success btn-sm  ms-2" href={`/teacher/add-chapter/${course.id}`}>Add Chapters</Link>
                    </td>
                  </tr>
                    )) 
                  )}
                </tbody>
              </table>
            </div>
          </div> 
        </section>
      </div>
    </div>
  );
}

export default TeacherMyCourses;
{
  /* <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>Php Development</td>
                  <td>
                    <Link href="/">Suraj Kumar</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div> */
}
