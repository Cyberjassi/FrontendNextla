'use client'
import axios from 'axios';
import Link from 'next/link'
import { useState, useEffect } from 'react';


export default function CategoryCourses(props:any) {

  const [allCourses, setAllCourses] = useState<any[]>([]); // Specify the type as an array of any
  const currentSkill = props.params['skill']
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/course/?category=${currentSkill}`)
      .then(response => {
        console.log('Data:', response.data);
        setAllCourses(response.data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <div className="container mt-3">
     <h3 className="pb-1 my-4 text-start">
          {currentSkill} Courses{" "}
          
        </h3>
        <div className="row mb-4">
        {allCourses.map((course:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <Link href={`/course-detail/${course.id}`}>
                    <img
                      className="card-img-top"
                      src={`${course.featured_img}`}
                      alt={course.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/course-detail/${course.id}`}>{course.title}</Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Rating: 4.5/5</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
    </div>
  )
}
