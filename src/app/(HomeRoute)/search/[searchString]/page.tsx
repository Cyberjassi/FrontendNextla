'use client'
import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import Footer from './Footer';
import axios from 'axios';
import Link from 'next/link';
import Rating from '@/components/Home/Rating';
import Button from "@mui/material/Button";


function Search(props:any) {
  const searchString = props.params['searchString']
  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  useEffect(() => {
    axios.get(`${process.env.BASE_URL}course/?searchString=${searchString}`)
    .then(response => {
        console.log('Data:', response.data);
        setAllCourses(response.data.results);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}, []);
  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Search For <span className='text-primary'>{searchString}</span>
            <Button
              variant="contained"
              color="primary"
              href="/all-courses"
              className="float-end ccard"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {allCourses.length == 0 && <p>No Course there for for {searchString}</p>}
            {allCourses && allCourses.map((course:any,index:number)=>
              <div className="col-md-3" key={course.id}>
                <div className="card ccard shadow">
                  <Link href={`/course-detail/${course.id}`}>
                    <img
                      className="card-img-top"
                      src={course.featured_img ?  course.featured_img : "/img/default.png"}
                      alt={course.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link className='custom-link-style' href={`/course-detail/${course.id}`}>{course.title}</Link>
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
                    
                      <p>Price: <span className="text-black text-base">₹</span>{course.price}</p>
                      {/* <span className="float-end">
                        Views:{row.course.course_views}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default Search;
