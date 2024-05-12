"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link"
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";
import Swal from "sweetalert2";


function studentAssignments() {
  const [assignmentData,setassignmentData] = useState<any>([])
  const [assignmentStatus,setassignmentStatus]=useState<any>()

  const studentId:any = localStorage.getItem('studentId')

  useEffect (()=>{
    try{
        axios.get(`http://127.0.0.1:8000/api/my-assignments/${studentId}`)
        .then((res)=>{
          setassignmentData(res.data)
        })
    }catch(error){
      console.log(error)
    }
  },[])


  const markAsDone = (assignment_id:string,title:string,detail:string,student:string,teacher:string) =>{
    const studentID = localStorage.getItem('studentId');
    // e.preventDefault();
    const formData = new FormData();
    formData.append('student_status',true as any);
    formData.append('title',title);
    formData.append('detail',detail);
    formData.append('student',student);
    formData.append('teacher',teacher);
  
  try{
    // console.log("here course form data",[...courseFormData.entries()])
    
    axios.put(`http://127.0.0.1:8000/api/update-assignments/${assignment_id}/`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        console.log(response.data);
        if(response.status==200 || response.status==201){
        //   Swal.fire({
        //     title:'You have succesfully completed this assignment',
        //     icon:'success',
        //     toast:true,
        //     timer: 5000,
        //     position:'top-right',
        //     timerProgressBar:true,
        //     showConfirmButton: false,
        //   });
        //   setassignmentStatus('success');
          window.location.reload();
        }
        // window.location.href='/teacher/add-courses';
      })   
    }catch(error){
      console.log(error);
    }
  }
console.log("this is assignment data ",assignmentData)

// console.log("this is teacher data",courseData)
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
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
                {assignmentData.map((row:any,index:any)=>
                  <tr>
                    <td>{row.title}</td>
                    <td>{row.detail}</td>
                    <td>
                      <Link href={`/teacher-detail/${row.teacher.id}`}>{row.teacher.full_name}</Link>
                    </td>
                    <td>
                      {row.student_status==false &&
                      <button onClick={()=>markAsDone(row.id,row.title,row.detail,row.student.id,row.teacher.id) as any} className="btn btn-success btn-sm">Mark as Done</button>
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
