'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Rating from '@/components/Home/Rating';

export default function AllCourses() {
  const baseUrl = `${process.env.BASE_URL}course/`;
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData(baseUrl);
  }, []);

  const fetchData = (url: string) => {
    axios.get(url)
      .then(response => {
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
        setAllCourses(response.data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const paginationHandler = (url: string) => {
    fetchData(url);
  };+
console.log(allCourses)
  return (
    <div className="container mt-4">
      <h3 className="pb-1 my-4 text-start">All Courses</h3>
      <div className="row mb-4">
        {allCourses.map((course: any, index: number) => (
          <div className="col-md-3" key={index}>
            <div className="ccard card shadow-lg">
              <Link href={`/course-detail/${course.id}`}>
                <img
                  className="card-img-top"
                  src={course.featured_img?course.featured_img:"/img/default.png"}
                  alt={course.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link className="custom-link-style" href={`/course-detail/${course.id}`}>
                    {course.title}
                  </Link>
                  <p className="description">
                  {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                  </p>
                </h5>
              </div>
              <div className="card-footer">
                    <div className="title">
                      {/* <span>Rating: {course.rating}/5</span> */}
                      <span>Rating: <Rating rating={course.course_rating} /></span>
                      <p>Price: <span className="text-black text-base">₹</span>{course.price}</p>
                      {/* <span className="float-end">
                        Views:{row.course.course_views}
                      </span> */}
                    </div>
                  </div>
            </div>
          </div>
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
