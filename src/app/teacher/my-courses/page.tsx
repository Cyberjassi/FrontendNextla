"use client"
import React from "react";
import { useEffect ,useState} from 'react';
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { getCourseInfo } from "@/app/redux/Course/CourseRetreieve";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import cookies from 'js-cookie';



function TeacherMyCourses() {
  const token = cookies.get('token')
  const teacherId = localStorage.getItem('teacherId')
  console.log("this is teacher id",teacherId)
  const dispatch = useDispatch()
  useEffect (()=>{
    dispatch(getCourseInfo() as any)
  },[dispatch])
  const state = useSelector((state:any)=>state);
  console.log("this is my data",state.course.data)
  const courseData = state.course.data
  async function deleteAndFetchData(currentCourse: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.BASE_URL}teacher-courses-detail/${currentCourse}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });
        Swal.fire('success','Data has been deleted. ');
        dispatch(getCourseInfo() as any)
      } catch (error) {
        Swal.fire("error", "Data has not been deleted!!", "error");
      }
    } else {
      Swal.fire('Cancelled', 'Your data is safe :)', 'info');
    }
  }
 
  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card shadow">
            <h5 className="card-header text-center bg-primary text-white">My Courses</h5>
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
                    <CircularProgress />
                  ):
                  (courseData&&
                    courseData.map((course:any,index:any)=>(
                 <tr key={index} >
                    <td>
                      <Link className="link-none" href={`chapter/${course.id}`}>{course.title}</Link>
                   <br />
                      {course.course_rating && 
                     <span className="description">Rating: {course.course_rating}/5</span>
                      }
                      {!course.course_rating && 
                     <span className="description">Rating: 0/5</span>
                      }
                    </td>
                    <td><img src={course.featured_img ? course.featured_img : "/img/default.png"} width="80" className="rounded" alt={course.title} /></td>
                    <td>
                      <Link className="link-none" href={`enrolled-students/${course.id}`}>{course.total_enrolled_students}</Link>
                    </td>
                    <td>
                    <Link className="btn btn-info btn-sm ccard" href={`/teacher/edit-course/${course.id}`}>Edit</Link>
                    <Link className="btn btn-warning btn-sm ms-2 ccard" href={`/teacher/study-material/${course.id}`}>Study Material</Link>
                      <Link className="btn btn-success btn-sm  ms-2 ccard" href={`/teacher/add-chapter/${course.id}`}>Add Chapters</Link>
                      <button onClick={()=> deleteAndFetchData(course.id)} className="btn btn-danger btn-sm  ms-2 ccard">Delete</button>
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

