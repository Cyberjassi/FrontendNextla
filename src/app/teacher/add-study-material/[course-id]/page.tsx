'use client'
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


function AddStudyMaterial(props:any) {

  // fetch current course from url---
const currentCourse = props.params['course-id']
// console.log("this is current course",currentCourse)

interface studyData {
  'title': string;
  'description': string;
  'upload':any;
  'remarks': string;

}


const [studyData, setstudyData] = useState<studyData>({
  title: '',
  description: '',
  upload:'',
  remarks: ''
});

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setstudyData({
    // we pass referance CourseData and then change our name and value acording to event 
    ...studyData,
    [event.target.name]: event.target.value
  });
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement|any>) => {
window.URL || window.webkitURL;
var upload = document.createElement('upload')
upload.src = URL.createObjectURL(event.target.files[0]);

setstudyData({
  ...studyData,
  [event.target.name] : event.target.files[0]
})
};


const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("jalksdfjlkasdjf")
  const formData = new FormData();
  
  formData.append('course',currentCourse); 
  formData.append('title', studyData.title);
  formData.append('description', studyData.description);
  formData.append('upload', studyData.upload);
  formData.append('remarks', studyData.remarks);

  
    // console.log("here course form data", [...formData.entries()]);
    
    axios.post(`http://127.0.0.1:8000/api/study-materials/${currentCourse}`, formData, {
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
            <h5 className="card-header">Add Study Materials</h5>
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
                htmlFor="upload"
                 className="form-label">
                 Upload
                </label>
                <input
                  onChange={handleFileChange}
                  name="upload"
                  type="file"
                  className="form-control"
                  id="upload"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label 
                htmlFor="Reamarks"
                 className="form-label" >
                  remarks
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    name="remarks"
                    className="form-control"
                    id="Remarks"
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

export default AddStudyMaterial;
