'use client'
import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import Footer from './Footer';
import axios from 'axios';
import Link from 'next/link';

function Main() {
  // const siteUrl = 'https://res.cloudinary.com/daajyumzx/'
  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]); 
  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]); 
  const [studetTestimonnialData, setstudetTestimonnialData] = useState<any[]>([]); 
  const role = localStorage.getItem('teacherLoginStatus')?'teacher':localStorage.getItem('studentLoginStatus')?'student':'';
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://127.0.0.1:8000/api/course/?result=4', {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        params: {
          role: role
      }
    })
    .then(response => {
        console.log('Data:', response.data);
        setAllCourses(response.data.results);
    })
    .catch(error => {
        console.error('Error:', error);
    });

  //  fatch popular courses according to rating-
    axios.get('http://127.0.0.1:8000/api/popular-courses/?popular=1',)
    .then(response => {
        console.log('Data:', response.data);
        setpopularCourseData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    //fatch popular teachers-
    axios.get('http://127.0.0.1:8000/api/popular-teachers/?popular=1',)
    .then(response => {
        console.log('Data:', response.data);
        setpopularTeacherData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // fatch studet testimonial
    axios.get('http://127.0.0.1:8000/api/student-testimonial',)
    .then(response => {
        console.log('Data:', response.data);
        setstudetTestimonnialData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    

    // console.log("your token is, ",token);
}, []);
  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Latest Courses
            <Link href="/all-courses" className="float-end btn btn-danger">
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
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Popular Courses
            <Link href="/popular-courses" className="float-end btn btn-danger">
              See All
            </Link>
          </h3>
          <div className="row mb-4">
            {popularCourseData.map((row:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <Link href={`/course-detail/${row.course.id}`}>
                    <img
                      className="card-img-top"
                      src={`${row.course.featured_img}`}
                      alt={row.course.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/course-detail/${row.course.id}`}>{row.course.title}</Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Rating: {row.rating}/5</span>
                      <span className='float-end'>Views:{row.course.course_views}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Popular Teachers
            <Link href="/popular-teachers" className="float-end btn btn-danger">
              See All
            </Link>
          </h3>
          <div className="row mb-4">
            {popularTeacherData.map((teacher:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <Link href={`/teacher-detail/${teacher.id}`}>
                    <img
                      className="card-img-top"
                      src={`${teacher.profile_img}`}
                      alt={teacher.full_name}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Courses:{teacher.total_teacher_courses}</span>
                    
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        <h3 className="pb-1 my-4 mt-4">Student Testimonial</h3>
        <div
          id="carouselExampleIndicators"
          className="carousel slide bg-dark text-white py-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {studetTestimonnialData && studetTestimonnialData.map((row,index)=>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index==0 ? "active" : ""}
              // aria-current="true"
              // aria-label="Slide 1"
            ></button>
          )}
          </div>
          <div className="carousel-inner">
            {studetTestimonnialData && studetTestimonnialData.map((row,i)=>
            <div className={i == 0 ?  "carousel-item text-center active" : "carousel-item text-ceter"}>
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>{row.reviews}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {row.course.title}
                  <cite title="Source Title">{row.student.full_name}</cite>
                </figcaption>
              </figure>
            </div>
            )}
    
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        </div>
      </>
    </div>
  );
}

export default Main;
