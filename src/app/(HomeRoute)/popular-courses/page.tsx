"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "@/components/courseCard";

export default function PopularCourses() {
  const baseUrl = `${process.env.BASE_URL}popular-courses/?popular=1`;
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]);
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
        setpopularCourseData(response.data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const paginationHandler = (url: string) => {
    fetchData(url);
  };

  console.log("this is popular courses data ", popularCourseData);
  return (
    <div className="container mt-4">
      <h3 className="pb-1 my-4 text-start">Popular Courses</h3>
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
