"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";


function FavoriteCourses() {
  const [courseData,setCourseData] = useState<any>([])

  const studentId = localStorage.getItem('studentId')

  useEffect (()=>{
    try{
        axios.get(`${process.env.BASE_URL}fatch-favorite-courses/${studentId}`)
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
         <div className="card">
            <h5 className="card-header">Favorite Courses</h5>
            <div className="card-body shadow">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                {courseData.map((row:any,index:any)=>
                  <tr key={index}>
                    <td><Link className ="custom-link-style" href={`/course-detail/${row.course.id}`}>{row.course.title}</Link></td>
                    <td>
                      <Link className ="custom-link-style" href={`/teacher-detail/${row.course.teacher.id}`}>{row.course.teacher.full_name}</Link>
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

export default FavoriteCourses;
