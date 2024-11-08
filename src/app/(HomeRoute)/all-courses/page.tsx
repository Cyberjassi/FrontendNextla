"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/courseCard";

export default function AllCourses() {
  const baseUrl = `${process.env.BASE_URL}course/`;
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData(baseUrl);
  }, []);

  const fetchData = (url: string) => {
    axios
      .get(url)
      .then((response) => {
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
        setAllCourses(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const paginationHandler = (url: string) => {
    fetchData(url);
  };

  console.log(allCourses);

  return (
    <div className="container mt-4">
      <h3 className="pb-1 my-4 text-start">All Courses</h3>
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

      {/* Pagination Start */}
      <nav aria-label="Page navigation example mt-5">
        <ul className="pagination justify-content-center">
          {previousUrl && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginationHandler(previousUrl)}
              >
                <i className="bi bi-arrow-left"> Previous </i>
              </button>
            </li>
          )}

          {nextUrl && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginationHandler(nextUrl)}
              >
                <i className="bi bi-arrow-right"> Next </i>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
