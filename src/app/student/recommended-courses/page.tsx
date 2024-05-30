"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";


function RecommendedCourses() {
  const [courseData,setCourseData] = useState<any>([])

  const studentId = localStorage.getItem('studentId')

  useEffect (()=>{
    try{
        axios.get(`${process.env.BASE_URL}fatch-recommended-courses/${studentId}`)
        .then((res)=>{
          setCourseData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])


  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card shadow">
            <h5 className="card-header">Recommended Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Technologies</th>
                  </tr>
                </thead>
                <tbody>
                {courseData.map((row:any,index:any)=>
                  <tr key={index}>
                    <td><Link className="link-none" href={`/course-detail/${row.course.id}`}>{row.course.title}</Link></td>
                    <td>
                      {row.course.techs}
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

export default RecommendedCourses;
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
                    <Link to="/">Suraj Kumar</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div> */
}
