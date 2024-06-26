"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import "./Home.module.css";
import Button from "@mui/material/Button";
import cookies from "js-cookie";
import Rating from "./Rating";

function Main() {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]);
  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]);
  const [studetTestimonnialData, setstudetTestimonnialData] = useState<any[]>(
    []
  );
  useEffect(() => {
    const token = cookies.get("token");
    console.log("this is my token", token);
    const response = axios
      .get(`${process.env.BASE_URL}course/?result=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Data:", response.data);
        setAllCourses(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //  fatch popular courses according to sum of all rating-
    axios
      .get(`${process.env.BASE_URL}popular-courses/?popular=1`)
      .then((response) => {
        console.log("Data:", response.data);
        setpopularCourseData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //fatch popular teachers-
    axios
      .get(`${process.env.BASE_URL}popular-teachers/?popular=1`)
      .then((response) => {
        console.log("Data:", response.data);
        setpopularTeacherData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // fatch studet testimonial
    axios
      .get(`${process.env.BASE_URL}student-testimonial`)
      .then((response) => {
        console.log("Data:", response.data);
        setstudetTestimonnialData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [""]);

  return (
    <div>
      <>
        {/* fatch all course */}
        <div className="container mt-10">
          <h3 className="pb-1 my-4 text-start  course-heading">
            Latest Courses
            <Button
              variant="contained"
              color="primary"
              href="/all-courses"
              className="float-end custom-button ccard"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {allCourses.map((course: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="ccard card shadow-lg">
                  <Link href={`/course-detail/${course.id}`}>
                    <Image
                      className="card-img-top"
                      src={
                        course.featured_img
                          ? course.featured_img
                          : "/img/default.png"
                      }
                      alt={course.title}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/course-detail/${course.id}`}
                      >
                        {course.title}
                      </Link>
                      <p className="description">
                        {course.description.length > 30
                          ? `${course.description.substring(0, 100)}...`
                          : course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>
                        Rating: <Rating rating={course.course_rating} />
                      </span>
                      <p>
                        Price: <span className="text-black text-base">₹</span>
                        {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular course */}
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start course-heading">
            Popular Courses
            <Button
              variant="contained"
              color="primary"
              href="/popular-courses"
              className="float-end ccard"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {popularCourseData.map((row: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="ccard card shadow-lg">
                  <Link href={`/course-detail/${row.course.id}`}>
                    <Image
                      className="card-img-top"
                      src={
                        row.course.featured_img
                          ? row.course.featured_img
                          : "/img/default.png"
                      }
                      alt={row.course.title}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/course-detail/${row.course.id}`}
                      >
                        {row.course.title}
                      </Link>
                      <p className="description">
                        {row.course.description.length > 30
                          ? `${row.course.description.substring(0, 100)}...`
                          : row.course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>
                        Rating: <Rating rating={row.average_rating} />
                      </span>
                      <p>
                        Price: <span className="text-black text-base">₹</span>
                        {row.course.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* popular teachers */}
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start course-heading">
            Popular Teachers
            <Button
              variant="contained"
              color="primary"
              href="/popular-teachers"
              className="float-end ccard"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {popularTeacherData.map((teacher: any, index: number) => (
              <div className="col-md-3" key={index}>
                <div className="ccard card shadow-lg">
                  <Link href={`/teacher-detail/${teacher.id}`}>
                    <Image
                      className="card-img-top"
                      src={
                        teacher.profile_img
                          ? teacher.profile_img
                          : "/img/default.png"
                      }
                      alt={teacher.full_name}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/teacher-detail/${teacher.id}`}
                      >
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

          {/* student testimonial */}
          <h3 className="pb-1 my-4 mt-4 course-heading">Student Testimonial</h3>
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
                        {row.course.title} &nbsp;
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
