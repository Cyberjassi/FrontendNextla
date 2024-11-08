"use client";
import { useEffect, useState } from "react";
import "./Home.module.css";
import Button from "@mui/material/Button";
import cookies from "js-cookie";
import getApi from "@/helper/getApi";
import CourseCard from "../courseCard";
import TeacherCard from "../teacherCard";
import StudentTestimonialCard from "../studentTestimonialCard";

function Main() {
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]);
  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]);
  const [studetTestimonnialData, setstudetTestimonnialData] = useState<any[]>(
    []
  );

  
const fetchData = async () => {
  try {
    const token = cookies.get("token");
    const [courses, popularCourses, popularTeachers, testimonials] = await Promise.all([
      getApi("course/?result=4",{Authorization: `Bearer ${token}`}),
      getApi("popular-courses/?popular=1"),
      getApi("popular-teachers/?popular=1"),
      getApi("student-testimonial"),
    ]);

    setAllCourses(courses.results);
    setpopularCourseData(popularCourses.results);
    setpopularTeacherData(popularTeachers.results);
    setstudetTestimonnialData(testimonials.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, []);


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
              <CourseCard
              courseId={course.id}
              index={index}
              ImgUrl={course.featured_img}
              Title={course.title}
              Description={course.description}
              cRating={course.course_rating}
              Price={course.price}
              />
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
              <CourseCard
              courseId={row.course.id}
              index={index}
              ImgUrl={row.course.featured_img}
              Title={row.course.title}
              Description={row.course.description}
              cRating={row.average_rating}
              Price={row.course.price}
              />
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
             <TeacherCard
              TeacherId={teacher.id}
              Index={index}
              ImgUrl={teacher.profile_img}
              Name={teacher.full_name}
              TotalC={teacher.total_teacher_courses}
             />
            ))}
          </div>

          {/* student testimonial */}
          <StudentTestimonialCard
           studetTestimonnialData={studetTestimonnialData}
          />
        </div>
      </>
    </div>
  );
}

export default Main;
