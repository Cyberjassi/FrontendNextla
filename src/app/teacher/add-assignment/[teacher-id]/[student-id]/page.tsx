'use client'
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function addAssignment(props:any) {

  // fetch current course from url---
  const teacher_id = localStorage.getItem('teacherId')
const student_id = props.params['student-id']
// console.log("this is current course",currentCourse)

interface ChapterData {
  'title': string;
  'detail': string;
}


const [assignmentData, setassignmentData] = useState<ChapterData>({
  title: '',
  detail: '',  
});

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setassignmentData({
    // we pass referance CourseData and then change our name and value acording to event 
    ...assignmentData,
    [event.target.name]: event.target.value
  });
};



const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("jalksdfjlkasdjf")
  const chapterFormData = new FormData();
  
  chapterFormData.append('teacher',teacher_id); 
  chapterFormData.append('title', assignmentData.title);
  chapterFormData.append('detail', assignmentData.detail);
  chapterFormData.append('student', student_id);

  
    // console.log("here course form data", [...chapterFormData.entries()]);
    
    axios.post(`http://127.0.0.1:8000/api/student-assignment/${student_id}/${teacher_id}`, chapterFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((response) => {
      console.log(response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'Assignment has been added',
          icon:'success',
          toast:true,
          timer: 3000,
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
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Assignment</h5>
            <form className="container" onSubmit={submitForm}>
              <div className="mb-3">
                <label
                 htmlFor="title"
                  className="form-label ">
                  Title
                </label>
                <input
                  onChange={handleChange}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                 htmlFor="detail" 
                 className="form-label">
                  Detail
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    name="detail"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="detail"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default addAssignment;
