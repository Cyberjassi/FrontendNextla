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
const imageUrl = "https://res.cloudinary.com/dr9wiqs2y/image/upload/v1/"

const siteUrl = 'http://127.0.0.1:8000/'
// console.log("this is param is",currentCourse)
const [course, setCourse] = useState<any|String[]>([]); 
const [teacher, setTeacher] = useState<any|String[]>([]);  
const [chapterData, setChapterData] = useState<any|String[]>([]); 
const [realtedCourseData, setrealtedCourseData] = useState<any|String[]>([]); 
const [techListData, setTechListData] = useState<any|String[]>([]); 
const [userLoginStatus,setUserLoginStatus]=useState("")
const [enrollStatus,setEnrollStatus] = useState("");
const [ratingStatus,setratingStatus] = useState("");
const [Avgrating,setAvgrating] = useState(0);
const [favoriteStatus,setfavoriteStatus] = useState<any>();
  
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
      if(response.data.course_rating!='' && response.data.course_rating!=null){
        setAvgrating(response.data.course_rating)
      }
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

// fatch rating status-
  axios.get(`http://127.0.0.1:8000/api/fatch-rating-status/${studentId}/${currentCourse}`)
    .then(response => {
      console.log("this is a response for bool",response)
      if(response.data.bool == true){
        setratingStatus('success')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });


  axios.get(`http://127.0.0.1:8000/api/fatch-favorite-status/${studentId}/${currentCourse}`)
    .then(response => {
      console.log("this is a response for bool",response)
      if(response.data.bool == true){
        setfavoriteStatus('success')
      }else{
        setfavoriteStatus('')
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
        window.location.reload();
      }
      // window.location.href='/teacher/add-courses';
    })   
  }catch(error){
    console.log(error);
  }
}

//Mark as favorite Course
const marksAsFavorite = ()=>{
  const favCourseFormData = new FormData();
  
  favCourseFormData.append('course',currentCourse);
  favCourseFormData.append('student',studentId);
  favCourseFormData.append('status',true);

try{
    axios.post(`http://127.0.0.1:8000/api/student-add-favorite-course/`, favCourseFormData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response):any => {
      console.log("student favorite status",response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'This course has been added in your favorite list ',
          icon:'success',
          toast:true,
          timer: 10000,
          position:'top-right',
          timerProgressBar:true,
          showConfirmButton: false,
        });
        setfavoriteStatus('success');
        window.location.reload();
      }
      // window.location.href='/teacher/add-courses';
    })   
  }catch(error){
    console.log(error);
  }
}

//Remove favorite Course
const removeFavorite = ()=>{
  const favCourseFormData = new FormData();
  
  favCourseFormData.append('course',currentCourse);
  favCourseFormData.append('student',studentId);
  favCourseFormData.append('status',false);

try{
    axios.post(`http://127.0.0.1:8000/api/student-remove-favorite-course/${currentCourse}/${studentId}`, favCourseFormData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then((response):any => {
      console.log("student favorite status",response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'This course has been removed from your favorite list ',
          icon:'success',
          toast:true,
          timer: 10000,
          position:'top-right',
          timerProgressBar:true,
          showConfirmButton: false,
        });
        setfavoriteStatus('');
        window.location.reload();
      }
      // window.location.href='/teacher/add-courses';
    })   
  }catch(error){
    console.log(error);
  }
}

// Add Rating-
interface ChapterData {
  rating:string;
  reviews:string;
  // 'course':string|number;
  // 'title': string;
  // 'description': string;
  // 'video': null|File |any|Blob;
  // 'video_duration': any;
  // 'remarks': string;

}


const [ratingData, setratingData] = useState<ChapterData>({
 rating:'',
 reviews:''
});

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setratingData({
    // we pass referance CourseData and then change our name and value acording to event 
    ...ratingData,
    [event.target.name]: event.target.value
  });
};


const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("jalksdfjlkasdjf")
  const chapterFormData = new FormData();
  
  chapterFormData.append('course',currentCourse); 
  chapterFormData.append('student', studentId);
  chapterFormData.append('rating', ratingData.rating);
  chapterFormData.append('reviews', ratingData.reviews);

  
    // console.log("here course form data", [...chapterFormData.entries()]);
    
    axios.post(`http://127.0.0.1:8000/api/course-rating/`, chapterFormData,)
    .then((response) => {
      console.log(response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'Rating has been added',
          icon:'success',
          toast:true,
          timer: 5000,
          position:'top-right',
          timerProgressBar:true,
          showConfirmButton: false,
        });
        window.location.reload();
      }
    }).catch((error) => {
      console.error('Error:', error);
      // Handle the error here, such as displaying an error message to the user
      Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding data',
          icon: 'error',
      });
  });
  
    
};

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
          <p className="fw-bold">Total Enrolled: {course.total_enrolled_students} Students</p>
          <p className="fw-bold">
            Rating: {Avgrating}/5 
            {enrollStatus === 'success' && userLoginStatus === 'success' && 
        <>
        {ratingStatus != 'success' && 
          <button className='btn btn-success btn-sm ms-2'  data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
        }
        {ratingStatus == 'success' && 
          <small className='badge bg-info text-dark ms-2'>You already rated this course</small>
        }
          <div className="modal fade" id="ratingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Rate for course {course.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    {/* <span aria-hidden="true">&times;</span> */}
                  </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={submitForm as any}>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Rating</label>
                          <select onChange={handleChange as any} className='form-control' name='rating'>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Review</label>
                        <textarea onChange={handleChange as any} rows={10} name="reviews"className='form-control'></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
          </>
          }
            </p>
          {enrollStatus == 'success' && userLoginStatus == 'success' &&
          <p><span>You are already enrolled in this course</span></p>
          }
          {userLoginStatus == 'success' && enrollStatus !== 'success' &&
          <p><button className='btn btn-success' onClick={enrollCourse} type='button'>Enroll in this course</button></p>
          }

          {userLoginStatus == 'success' && favoriteStatus!=='success' &&
          <p><button className='btn btn-outline-danger' onClick={marksAsFavorite} title='Add in Your Favorite Course List' type='button'><i className='bi bi-heart'></i></button></p>
          }

          {userLoginStatus == 'success' && favoriteStatus=='success' &&
          <p><button className='btn btn-outline-danger' onClick={removeFavorite} title='Remove from your Your favorite Course List' type='button'><i className='bi bi-heart-fill'></i></button></p>
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
                // src={`'${imageUrl}${rcorse.fields.featured_img}`}
                src={`${imageUrl}${rcorse.fields.featured_img}`}
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