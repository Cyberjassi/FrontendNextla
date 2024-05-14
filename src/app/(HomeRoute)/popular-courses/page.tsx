'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect,useState } from 'react';
import axios from 'axios';

export default function PopularCourses() {
  const [popularCourseData, setpopularCourseData] = useState<any[]>([]); 
  
  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/popular-courses/?all=1',)
    .then(response => {
        console.log('Data:', response.data);
        setpopularCourseData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, []);
console.log("this is popular courses data ",popularCourseData)
  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Popular Courses
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
                      <span className='float-end'>Views: {row.course.course_views}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    
        {/* End Latest Courses */}

        {/* Pagination Start */}
        <nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
        {/* Pagination End */}
      </>
    </div>
  )
}
