'use client'
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function AddChapter(props:any) {

  // fetch current course from url---
const currentCourse = props.params['course-id']
// console.log("this is current course",currentCourse)

interface ChapterData {
  'course':string|number;
  'title': string;
  'description': string;
  'video': null|File |any|Blob;
  'video_duration': any;
  'remarks': string;

}


const [chapterData, setChapterData] = useState<ChapterData>({
  course:'',
  title: '',
  description: '',
  video: '',
  video_duration:'',
  remarks: ''
});


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0]; // Get the first file from the input
    setChapterData(prevChapterData => ({
      ...prevChapterData,
      video: file
    }));
  }
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setChapterData({
    // we pass referance CourseData and then change our name and value acording to event 
    ...chapterData,
    [event.target.name]: event.target.value
  });
};

console.log("this is chapter above submit",chapterData)
console.log("this is chapter title ",chapterData.course)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("jalksdfjlkasdjf")
  const chapterFormData = new FormData();
  
  chapterFormData.append('course',currentCourse); 
  chapterFormData.append('title', chapterData.title);
  chapterFormData.append('description', chapterData.description);
  chapterFormData.append('video', chapterData.video);
  chapterFormData.append('video_duration', chapterData.video_duration);
  chapterFormData.append('remarks', chapterData.remarks);

  
    // console.log("here course form data", [...chapterFormData.entries()]);
    
    axios.post(`http://127.0.0.1:8000/api/course-chapters/${currentCourse}`, chapterFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .then((response) => {
      console.log(response.data);
      if(response.status==200 || response.status==201){
        Swal.fire({
          title:'Data has been added',
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
            <h5 className="card-header">Add Chapter</h5>
            <form className="container" onSubmit={submitForm}>
              <div className="mb-3">
                <label
                //  for="exampleInputEmail1"
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
                //  for="exampleInputPassword1" 
                 className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label 
                // for="exampleInputEmail1"
                 className="form-label">
                 Video
                </label>
                <input
                  onChange={handleFileChange}
                  name="video"
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label 
                // for="exampleInputPassword1"
                 className="form-label" >
                  remarks
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    name="remarks"
                    className="form-control"
                    placeholder="This Video is Focused on basic Introduction"
                    id="floatingTextarea2"
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

export default AddChapter;
