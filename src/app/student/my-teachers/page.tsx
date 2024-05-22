"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";


function MyTeachers() {
  const [teacherData,setteacherData] = useState<any>([])

  const studentId = localStorage.getItem('studentId')

  useEffect (()=>{
    try{
        axios.get(`http://127.0.0.1:8000/api/fatch-my-teachers/${studentId}`)
        .then((res)=>{
          setteacherData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])
  console.log("this is teacher detail",teacherData)

console.log("this is teacher data",teacherData)
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
            <h5 className="card-header">My Teachers</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {teacherData.map((row:any,index:any)=>
                  <tr>
                    <td><Link href={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link></td>
                   <td>
                        <i className="bi bi-chat-fill"></i>
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

export default MyTeachers;
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
