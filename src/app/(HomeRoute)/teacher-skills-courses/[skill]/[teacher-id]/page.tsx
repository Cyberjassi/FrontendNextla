'use client'
import axios from 'axios';
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Rating from '@/components/Home/Rating';


export default function teacherSkillsCourses(props:any) {
  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  const currentSkill = props.params['skill']
  const currentTeacher = props.params['teacher-id']
  useEffect(() => {
    axios.get(`${process.env.BASE_URL}course/?skill_name=${currentSkill}&teacher=${currentTeacher}`)
   
      .then(response => {
        console.log('this is category course:', response.data.results);
        setAllCourses(response.data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <div className="container mt-3">
     <h3 className="pb-1 my-4 text-start">
          {currentSkill} Couses{" "}
        </h3>
        <div className="row mb-4">
        {allCourses && allCourses.map((course:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card ccard shadow">
                  <Link href={`/course-detail/${course.id}`}>
                    <img
                      className="card-img-top"
                      src={course.featured_img ? course.featured_img : "/img/default.png"}
                      alt={course.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link className="custom-link-style course-title" href={`/course-detail/${course.id}`}>
                        {course.title}
                      </Link>
                      <p className="description">
                      {course.description.length > 30 ? `${course.description.substring(0, 100)}...` : course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                    <span>Rating: <Rating key={index}  rating={course.course_rating} /></span>
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
        {/* End Latest Courses */}

        {/* Pagination Start */}

        {/* Pagination End */}
    </div>
  )
}
