"use client"
import Link from 'next/link';
import { useEffect ,useState} from 'react';
// import axios from 'axios';

import { getTeacherInfo } from '../../redux/teacher/TeacherRetrieve'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

export default function PopularTeachers() {
  const baseUrl = 'http://127.0.0.1:8000/api/popular-teachers/'
  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]); 
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData(baseUrl);
  }, [])
  
  const fetchData = (url: string) => {
    axios.get(url)
      .then(response => {
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
        setpopularTeacherData(response.data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const paginationHandler = (url: string) => {
    fetchData(url);
  };
  return (
    <div className="container mt-4">

          <h3 className="pb-1 my-4 text-start">
            Popular Teachers
            <Link href="/popular-teachers" className="float-end btn btn-danger">
              See All
            </Link>
          </h3>
          <div className="row mb-4">
            {popularTeacherData.map((teacher:any,index:number)=>
              <div className="col-md-3" key={index}>
                <div className="card">
                  <Link href={`/teacher-detail/${teacher.id}`}>
                    <img
                      className="card-img-top"
                      src={`${teacher.profile_img}`}
                      alt={teacher.full_name}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link href={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Courses:{teacher.total_teacher_courses}</span>
                    
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
        {/* Pagination End */}
  </div>
  )
}
