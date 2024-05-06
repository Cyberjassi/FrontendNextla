'use client'
import React from 'react'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function page(props:any) {

const currentCourse = props.params['course-id']
const studentId = localStorage.getItem('studentId')

const siteUrl = 'http://127.0.0.1:8000/'
// console.log("this is param is",currentCourse)
const [course, setCourse] = useState<any|String[]>([]); 
const [teacher, setTeacher] = useState<any|String[]>([]);  
const [chapterData, setChapterData] = useState<any|String[]>([]); 
const [realtedCourseData, setrealtedCourseData] = useState<any|String[]>([]); 
const [techListData, setTechListData] = useState<any|String[]>([]); 
const [userLoginStatus,setUserLoginStatus]=useState("")
const [enrollStatus,setEnrollStatus] = useState("");
  
useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/course/${currentCourse}`)
    .then(response => {
      console.log('Data:', response.data);
      setCourse(response.data);
      setTeacher(response.data.teacher);
      setChapterData(response.data.course_chapter);
      // to parse the related videos json format
      setrealtedCourseData(JSON.parse(response.data.related_videos));
      setTechListData(response.data.tech_list);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // fatch enroll status
  axios.get(`http://127.0.0.1:8000/api/fatch-enroll-status/${studentId}/${currentCourse}`)
    .then(response => {
      console.log("this is a response for bool",response)
      if(response.data.bool == true){
          setEnrollStatus('success')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });


    
    
    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  if(studentLoginStatus == 'true'){
   setUserLoginStatus('success')
  }
}, ['']);
console.log("related courses",realtedCourseData)
console.log("tech list ",techListData)

const enrollCourse = () =>{
  const studentID = localStorage.getItem('studentId');
  // e.preventDefault();
  const courseFormData = new FormData();
  // Object.entries(CourseData).forEach(([key, value]) => {
  //   courseFormData.append(key, value as string | Blob);
  // });
  courseFormData.append('course',currentCourse);
  courseFormData.append('student',studentID);

try{
  // console.log("here course form data",[...courseFormData.entries()])
  
  axios.post("http://127.0.0.1:8000/api/student-enroll-course/", courseFormData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response) => {
      console.log(response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'You have succesfully enrolled in this course',
          icon:'success',
          toast:true,
          timer: 5000,
          position:'top-right',
          timerProgressBar:true,
          showConfirmButton: false,
        });
        setEnrollStatus('success');
        // window.location.reload();
      }
      // window.location.href='/teacher/add-courses';
    })   
  }catch(error){
    console.log(error);
  }
}

  return (
      <div>
       
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            className="img-thumbnail"
            src={course.featured_img}
            alt="image "
          />
        </div>
        <div className="col-8">

          <h3>{course.title}</h3>
          <p>
           {course.description}
          </p>
          <p className="fw-bold">
            Course By: <Link href={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link>
          </p>
          <p className="fw-bold">
            Techs:&nbsp; 
            {techListData &&
                    techListData.map((tech: any, index: any) => (
            <Link href={`/category/${tech.trim()}`} className='badge badge-pill text-dark bg-warning'>{tech}</Link>
            ))}
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4.5/5 </p>
          {enrollStatus == 'success' && userLoginStatus == 'success' &&
          <p><span>You are already enrolled in this course</span></p>
          }
          {userLoginStatus == 'success' && enrollStatus !== 'success' &&
          <p><button className='btn btn-success' onClick={enrollCourse} type='button'>Enroll in this course</button></p>
          }
          {userLoginStatus !=='success'&&
          <p><Link className='btn btn-success' href='/login'>Please login to enroll in this course</Link></p>
          }
        </div>
      </div>
      {/* Course Videos */}
      {enrollStatus == 'success' && userLoginStatus == 'success' &&
      <div className="card mt-4">
        <div className="card">
          <h3 className="card-header">Course Videos</h3>
          <ul className="list-group list-group-flush">
          {chapterData &&
                    chapterData.map((chapter: any, index: any) => (
            <li key={index} className="list-group-item">
              {chapter.title}
              <span className="float-end">
                <span className="me-5">1 Hour 30 mins</span>
                <button
                  className="btn  btn-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal1"
                >
                  <FaYoutube size={20} />
                </button>
              </span>
              {/* Video Model Start */}
              <div
                className="modal fade"
                id="videoModal1"
                // tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Video 1
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          title="YouTube video"
                        //   allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Model End */}
            </li>
         ))}
          </ul>
        </div>
      </div>
      }
      {/* EndCourse Videos */}

      {/* Ratlated Course */}
      <h3 className="pb-1 my-4 text-start mt-5">
        Realted Courses
        <a href="#" className="float-end">
          See All
        </a>
      </h3>
      <div className="row mb-4">
      {realtedCourseData &&
                    realtedCourseData.map((rcorse: any, index: any) => (
        <div className="col-md-3">
          <div className="card">
            <Link target='__blank' href={`/course-detail/${rcorse.pk}`}>
               {/* here if we want to access the image we use whole path ,path means where our image is stored in python local dir  */}
              <img
                className="card-img-top"
                src={`${siteUrl}media/${rcorse.fields.featured_img}`}
                alt={rcorse.fields.title}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link href={`/course-detail/${rcorse.pk}`}>{rcorse.fields.title}</Link>
              </h5>
            </div>
          </div>
        </div>
      ))}
      </div>
      {/* Ratlated Course end*/}
    </div>
  </div>
  )
}

export default page
