"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";
import {useRouter} from "next/navigation";
import cookies from 'js-cookie';

function studentAssignments() {

  const [assignmentData,setassignmentData] = useState<any>([])
  const [assignmentStatus,setassignmentStatus]=useState<any>()

  const studentId:any = localStorage.getItem('studentId')

  useEffect (()=>{
    const token = cookies.get('token')
    try{
        axios.get(`${process.env.BASE_URL}my-assignments/${studentId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then((res)=>{
          setassignmentData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])


  const markAsDone = (assignment_id:string,title:string,detail:string,student:string,teacher:string) =>{
    const studentID = localStorage.getItem('studentId');
    const formData = new FormData();
    formData.append('student_status',true as any);
    formData.append('title',title);
    formData.append('detail',detail);
    formData.append('student',student);
    formData.append('teacher',teacher);
  
  try{
    const token = cookies.get('token')
    axios.put(`${process.env.BASE_URL}update-assignments/${assignment_id}/`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data);
        if(response.status==200 || response.status==201){
          try{
            axios.get(`${process.env.BASE_URL}my-assignments/${studentId}` ,{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
            })
            .then((res)=>{
              setassignmentData(res.data)
            })
        }catch(error){
          console.log(error)
        }
       
        }
      })   
    }catch(error){
      console.log(error);
    }
  }
console.log("this is assignment data ",assignmentData)

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card shadow">
            <h5 className="card-header">My Assignments</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Detail</th>
                    <th>Teacher</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {assignmentData && assignmentData.map((row:any,index:any)=>
                  <tr key={index}>
                    <td>{row.title}</td>
                    <td>{row.detail}</td>
                    <td>
                      <Link className="link-none" href={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link>
                    </td>
                    <td>
                      {row.student_status==false &&
                      <button onClick={()=>markAsDone(row.id,row.title,row.detail,row.student.id,row.teacher.id) as any} className="btn btn-success btn-sm ccard">Mark as Done</button>
                      }
                      {row.student_status== true &&
                      <span className="badge bg-primary">Completed</span>
                      }
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

export default studentAssignments;
