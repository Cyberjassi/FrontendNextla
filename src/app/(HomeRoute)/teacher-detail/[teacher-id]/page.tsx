'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
function TeacherDetail(props:any) {

  const currentTeacher = props.params['teacher-id']
  const [teacherData,setTeacherData]=useState<any>([])
  const [courseData,setCourseData]=useState<any>([])
  const [skillList,setskillList]=useState<any>([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/teacher/${currentTeacher}`)
      .then(response => {
        console.log('Data:', response.data);
        setTeacherData(response.data);
        setCourseData(response.data.teacher_courses);
        setskillList(response.data.skill_list);
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
              Skills: &nbsp; 
            {skillList &&
                    skillList.map((skill: any, index: any) => (
            <Link href={`/teacher-skills-courses/${skill.trim()}/${teacherData.id}`} className='badge badge-pill text-dark bg-warning'>{skill}</Link>
            ))}
         
            </p>
            <p className="fw-bold">Recent Course: <Link href="/course-detail/1">Php</Link></p>
           
            <p className="fw-bold">Rating: 4.5/5 </p>
          </div>
        </div>
        {/* Course Videos */}
        <div className="card mt-4">
          <div className="card mt-4">
            <h3 className="card-header">Course List</h3>
            <div className="list-group list-group-flush">
              {courseData.map((course:any,title:any)=>
               <Link href={`/course-detail/${course.id}`} className='list-group-item text-start kust-group-item-action'>{course.title}</Link>
              
              )}
              
              
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
