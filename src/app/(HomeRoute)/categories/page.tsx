'use client'
import axios from 'axios';
import Link from 'next/link'
import { useState, useEffect } from 'react';


export default function CategoryCourses(props:any) {

  const [categoryData, setcategoryData] = useState<any[]>([]); // Specify the type as an array of any
//   const currentSkill = props.params['skill']
  useEffect(() => {
    axios.get(`${process.env.BASE_URL}category/`)
      .then(response => {
        console.log('Data:', response.data);
        setcategoryData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <div className="container mt-3">
     <h3 className="pb-1 my-4 text-start">
          All Categories
        </h3>
        <div className="row mb-4">
        {categoryData && categoryData.map((row:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/course/?category=${row.id}`}>{row.title} ({row.total_courses})</Link>
                    </h5>
                    <p className="card-text">
                        {row.description}
                    </p>
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
