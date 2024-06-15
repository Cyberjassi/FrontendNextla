"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Rating from "@/components/Home/Rating";

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
                  height={300}
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
