"use client"
import Link from 'next/link';
import { useEffect ,useState} from 'react';
// import axios from 'axios';

import { getTeacherInfo } from '../../redux/teacher/TeacherRetrieve'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

export default function PopularTeachers() {

  const [popularTeacherData, setpopularTeacherData] = useState<any[]>([]); 

  useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/popular-teachers/?popular=1',)
    .then(response => {
        console.log('Data:', response.data);
        setpopularTeacherData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
  }, []);
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
