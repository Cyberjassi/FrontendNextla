"use client"
import { useEffect ,useState} from 'react';
import axios from 'axios';
import TeacherCard from '@/components/teacherCard';

export default function PopularTeachers() {
  const baseUrl = `${process.env.BASE_URL}popular-teachers/`
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
          </h3>
          <div className="row mb-4">
            {popularTeacherData.map((teacher:any,index:number)=>
            <TeacherCard
            TeacherId={teacher.id}
            Index={index}
            ImgUrl={teacher.profile_img}
            Name={teacher.full_name}
            TotalC={teacher.total_teacher_courses}
           />
            )}
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
        {/* Pagination End */}
  </div>
  )
}
