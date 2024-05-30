"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Rating from "@/components/Home/Rating";

export default function CategoryCourses(props: any) {
  const currentSkill = props.params["skill"];
  const baseUrl = `${process.env.BASE_URL}course/?category=${currentSkill}`;
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  // Specify the type as an array of any
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
    <div className="container mt-10">
      <h3 className="pb-1 my-4 text-start">{currentSkill} Courses </h3>
      <div className="row mb-4">
        {allCourses.map((course: any, index: number) => (
          <div className="col-md-3  " key={index}>
            <div className="card ccard shadow">
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
                  <Link
                    className="custom-link-style"
                    href={`/course-detail/${course.id}`}
                  >
                    {course.title}
                  </Link>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  {course.course_rating == null && (
                    <span>
                      Rating: <Rating rating={0} />
                    </span>
                  )}
                  {course.course_rating && (
                    <span>
                      Rating: <Rating rating={course.course_rating} />
                    </span>
                  )}

                  <p>
                    Price: <span className="text-black text-base">₹</span>
                    {course.price}
                  </p>
                  {/* <span className="float-end">
                        Views:{row.course.course_views}
                      </span> */}
                </div>
              </div>
            </div>
          </div>
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
