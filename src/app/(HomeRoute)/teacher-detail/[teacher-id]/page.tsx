'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
function TeacherDetail(props:any) {

  const currentTeacher = props.params['teacher-id']
  const [teacherData,setTeacherData]=useState<any>([])
  const [courseData,setCourseData]=useState<any>([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/teacher/${currentTeacher}`)
      .then(response => {
        console.log('Data:', response.data);
        setTeacherData(response.data);
        setCourseData(response.data.teacher_courses);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
console.log("teacher data",teacherData)
console.log("course data",courseData)
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-4">
            <img
              className="img-thumbnail"
              src="https://picsum.photos/200/300"
              alt="Teacher image"
            />
          </div>
          <div className="col-8">
            <h3>{teacherData.full_name}</h3>
            <p>
             {teacherData.detail}
            </p>
            <p className="fw-bold">
              Skills: <Link href="/category/php">Php</Link>,<Link href="/category/php">Python</Link>,<Link href="/category/php">Java</Link>,
            </p>
            <p className="fw-bold">Recent Course: <Link href="/teacher-detail/1">Php</Link></p>
           
            <p className="fw-bold">Rating: 4.5/5 </p>
          </div>
        </div>
        {/* Course Videos */}
        <div className="card mt-4">
          <div className="card mt-4">
            <h3 className="card-header">Course List</h3>
            <div className="list-group list-group-flush">
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
              
            </div>
          </div>
        </div>
        {/* EndCourse Videos */}

        {/* Ratlated Course */}
      
      </div>
    </div>
  )
}

export default TeacherDetail
