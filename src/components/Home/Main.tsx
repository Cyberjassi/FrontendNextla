'use client'
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import Link from 'next/link';

function Main() {
  // const siteUrl = 'https://res.cloudinary.com/daajyumzx/'
  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  const role = localStorage.getItem('teacherLoginStatus')?'teacher':localStorage.getItem('studentLoginStatus')?'student':'';
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/api/course/', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
          role: role
      }
    })
    .then(response => {
        console.log('Data:', response.data);
        setAllCourses(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log("your token is, ",token);
}, []);
  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Latest Courses
            <Link href="/all-courses" className="float-end">
              See All
            </Link>
          </h3>
          <div className="row mb-4">
            {allCourses.map((course:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <Link href={`/course-detail/${course.id}`}>
                    <img
                      className="card-img-top"
                      src={`${course.featured_img}`}
                      alt={course.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/course-detail/${course.id}`}>{course.title}</Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Rating: 4.5/5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default Main;
