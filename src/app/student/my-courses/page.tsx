"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";


function MyCourses() {
  const [courseData,setCourseData] = useState<any>([])

  const studentId = localStorage.getItem('studentId')

  useEffect (()=>{
    try{
        axios.get(`${process.env.BASE_URL}fatch-enrolled-courses/${studentId}`)
        .then((res)=>{
          setCourseData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])

console.log("this is teacher data",courseData)
  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card shadow">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Study Material</th>
                  </tr>
                </thead>
                <tbody>
                {courseData && courseData.map((row:any,index:any)=>
                  <tr key={index}>
                    <td><Link className="link-none" href={`/course-detail/${row.course.id}`}>{row.course.title}</Link></td>
                    <td>
                      <Link className="link-none" href={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link>
                    </td>
                   <td>
                       <Link className="btn btn-warning btn-sm ms-2 ccard" href={`study-material/${row.course.id}`}>Study Material</Link>
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

export default MyCourses;

