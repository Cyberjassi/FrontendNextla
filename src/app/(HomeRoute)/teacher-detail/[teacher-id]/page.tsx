'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


function TeacherDetail(props:any) {

  const currentTeacher = props.params['teacher-id']
  const [teacherData,setTeacherData]=useState<any>([])
  const [courseData,setCourseData]=useState<any>([])
  const [skillList,setskillList]=useState<any>([])

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}teacher/${currentTeacher}`)
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
      <div className="container mt-10">
        <div className="row">
          <div className="col-4">
            <img
              className="img-thumbnail"
              src={`${teacherData.profile_img}`}
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
            <Link key={index} href={`/teacher-skills-courses/${skill.trim()}/${teacherData.id}`} className='badge badge-pill text-dark bg-warning ml-1 link-none ccard'>{skill}</Link>
            ))}
         
            </p>
            <p className="fw-bold">Recent Course: <Link className='custom-link-style' href="/course-detail/1">Php</Link></p>
           
            <p className="fw-bold">Rating: 4.5/5 </p>
          </div>
        </div>
        {/* Course Videos */}
       
        <div className="card mt-4 shadow">
  <h3 className="card-header">Course List</h3>
  <div className="list-group list-group-flush">
    {courseData.map((course:any) => (
      <Link className='custom-link-style' key={course.id} href={`/course-detail/${course.id}`} passHref>
        <ListItem button component="a" className='list-group-item text-start list-group-item-action' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ListItemText primary={course.title} />
          <VisibilityIcon />
        </ListItem>
      </Link>
    ))}
  </div>
</div>
       
        {/* EndCourse Videos */}

        {/* Ratlated Course */}
      
      </div>
    </div>
  )
}

export default TeacherDetail
