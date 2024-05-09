"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";

// import { getCourseInfo } from "@/app/redux/Course/CourseRetreieve";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


function enrolledStudents(props:any) {
  const currentCourse = props.params['course-id']
  const [studentData,setStudentData] = useState<any>([])

  // to get teacher id from local storage---
  const teacherId = localStorage.getItem('teacherId')

  useEffect (()=>{
    try{
        axios.get(`http://127.0.0.1:8000/api/fatch-enrolled-students/${currentCourse}`)
        .then((res)=>{
          setStudentData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
            <h5 className="card-header">Enrolled Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Intrested Categories</th>
                  </tr>
                </thead>
                <tbody>
                    {studentData.map((row:any,index:any)=>
                    <tr>
                        <td>{row.student.full_name}</td>
                        <td>{row.student.email}</td>
                        <td>{row.student.username}</td>
                        <td>
                            {/* <Link className="btn btn-info btn-sm" href={`/view-student/${row.student.id}`}>View</Link> */}
                            {row.student.interested_categories}
                        </td>
                    </tr>
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

export default enrolledStudents;
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
