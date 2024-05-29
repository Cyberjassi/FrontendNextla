"use client";
import React, { useEffect, useState } from "react";
// import Header from './Header';
// import Footer from './Footer';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import './Home.module.css';

import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PopularCourses from "@/app/(HomeRoute)/popular-courses/page";

import Rating from './Rating'
function Main() {
  // const siteUrl = 'https://res.cloudinary.com/daajyumzx/'
  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]);
  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]);
  const [studetTestimonnialData, setstudetTestimonnialData] = useState<any[]>(
    []
  );
  const role = localStorage.getItem("teacherLoginStatus")
    ? "teacher"
    : localStorage.getItem("studentLoginStatus")
    ? "student"
    : "";
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/course/?result=4", {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        params: {
          role: role,
        },
      })
      .then((response) => {
        console.log("Data:", response.data);
        setAllCourses(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //  fatch popular courses according to rating-
    axios
      .get("http://127.0.0.1:8000/api/popular-courses/?popular=1")
      .then((response) => {
        console.log("Data:", response.data);
        setpopularCourseData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //fatch popular teachers-
    axios
      .get("http://127.0.0.1:8000/api/popular-teachers/?popular=1")
      .then((response) => {
        console.log("Data:", response.data);
        setpopularTeacherData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // fatch studet testimonial
    axios
      .get("http://127.0.0.1:8000/api/student-testimonial")
      .then((response) => {
        console.log("Data:", response.data);
        setstudetTestimonnialData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);
  console.log("this is your course ", allCourses);
  console.log("popular course",popularCourseData)
  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Latest Courses
            <Button
              variant="contained"
              color="primary"
              href="/all-courses"
              className="float-end custom-button card"
            >
              See All
            </Button>
            {/* <Button variant="contained">Hello world</Button> */}
          </h3>
          <div className="row mb-4">
            {allCourses.map((course: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="card shadow-lg">
                  <Link href={`/course-detail/${course.id}`}>
                    <Image
                      className="card-img-top"
                      src={`${course.featured_img}`}
                      alt={course.title}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link className="custom-link-style" href={`/course-detail/${course.id}`}>
                        {course.title}
                      </Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                  <span>Rating: {course.rating}/5</span>
                    <p>Price: <span className="text-black text-base">₹</span>{course.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Popular Courses
            <Button
              variant="contained"
              color="primary"
              href="/popular-courses"
              className="float-end card"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {popularCourseData.map((row: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="card shadow-lg">
                  <Link href={`/course-detail/${row.course.id}`}>
                    <Image
                      className="card-img-top"
                      src={`${row.course.featured_img}`}
                      alt={row.course.title}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link className="custom-link-style" href={`/course-detail/${row.course.id}`}>
                        {row.course.title}
                      </Link>
                      <p className="description">
                     {row.course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                    <span>Rating: <Rating rating={row.rating} /></span>
                      <p>Price: <span className="text-black text-base">₹</span>{row.course.price}</p>
                      {/* <span className="float-end">
                        Views:{row.course.course_views}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Popular Teachers
            <Button
              variant="contained"
              color="primary"
              href="/popular-teachers"
              className="float-end card"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {popularTeacherData.map((teacher: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="card shadow-lg">
                  {" "}
                  {/* Add shadow-sm class for a small shadow */}
                  <Link href={`/teacher-detail/${teacher.id}`}>
                    <Image
                      className="card-img-top"
                      src={`${teacher.profile_img}`}
                      alt={teacher.full_name}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link className="custom-link-style" href={`/teacher-detail/${teacher.id}`}>
                        {teacher.full_name}
                      </Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Courses: {teacher.total_teacher_courses}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="pb-1 my-4 mt-4">Student Testimonial</h3>
          <div
            id="carouselExampleIndicators"
            className="carousel slide bg-primary text-white py-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {studetTestimonnialData &&
                studetTestimonnialData.map((row, index) => (
                  <button
                   key={index}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className={index == 0 ? "active" : ""}
                    // aria-current="true"
                    // aria-label="Slide 1"
                  ></button>
                ))}
            </div>
            <div className="carousel-inner">
              {studetTestimonnialData &&
                studetTestimonnialData.map((row, i) => (
                  <div
                  key={i}
                    className={
                      i == 0
                        ? "carousel-item text-center active"
                        : "carousel-item text-ceter"
                    }
                  >
                    <figure className="text-center">
                      <blockquote className="blockquote">
                        <p>{row.reviews}</p>
                      </blockquote>
                      <figcaption className="blockquote-footer text-white">
                        {row.course.title}
                        <cite title="Source Title">
                          {row.student.full_name}
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                ))}
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
