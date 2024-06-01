'use client'
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ChaptervalidationSchema from './YupChapter'
import {useFormik} from "formik"
 

function AddChapter(props:any) {

  // fetch current course from url---
const currentCourse = props.params['course-id']
// console.log("this is current course",currentCourse)


let initialValues = {
  title: "",
  description: "",
  remarks: "",
}

const Formik = useFormik({
  initialValues:initialValues,
  validationSchema:ChaptervalidationSchema,
  onSubmit: async (values:any, { setSubmitting }) => {
    try {
      await submitForm(values);
      Formik.resetForm();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  },
})

const [chapterData, setChapterData] = useState<any>({
  video: '',
  video_duration:'',
});


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0]; // Get the first file from the input
    setChapterData((prevChapterData:any) => ({
      ...prevChapterData,
      video: file
    }));
  }
};


console.log("this is chapter above submit",chapterData)
console.log("this is chapter title ",chapterData.course)

const submitForm = async (values:any) => {
  Swal.fire({
    title: 'Wait a moment....',
    html: '<div class="full-screen-toast"><div class="loader"></div></div>',
    icon: 'warning',
    toast: true,
    timer: 60000,
    position: 'top-right',
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'full-screen-popup' // Add a CSS class for full-screen popup
    }
  });
  const chapterFormData = new FormData();
  
  chapterFormData.append('course',currentCourse); 
  chapterFormData.append('title', values.title);
  chapterFormData.append('description', values.description);
  chapterFormData.append('video', chapterData.video);
  chapterFormData.append('video_duration', chapterData.video_duration);
  chapterFormData.append('remarks', values.remarks);

  
    // console.log("here course form data", [...chapterFormData.entries()]);
    try{
    const response = await axios.post(`${process.env.BASE_URL}course-chapters/${currentCourse}`, chapterFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    chapterData.video=''
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
        
        // window.location.reload();
      }
    }catch(error){
      console.error('Error:', error);
      // Handle the error here, such as displaying an error message to the user
      Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding data',
          icon: 'error',
      });
  }
  
    
};

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header">Add Chapter</h5>
            <form className="container" onSubmit={Formik.handleSubmit}>
              <div className="mb-3">
                <label
                //  for="exampleInputEmail1"
                  className="form-label ">
                  Title
                </label>
                <input
                  value={Formik.values.title}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                 {Formik.errors.title && Formik.touched.title ? (<p className="text-sm text-red-600">{Formik.errors.title as any}</p>):null}
              </div>
              <div className="mb-3">
                <label
                //  for="exampleInputPassword1" 
                 className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    value={Formik.values.description}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                   {Formik.errors.description && Formik.touched.description ? (<p className="text-sm text-red-600">{Formik.errors.description as any}</p>):null}
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
                    value={Formik.values.remarks}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="remarks"
                    className="form-control"
                    placeholder="This Video is Focused on basic Introduction"
                    id="floatingTextarea2"
                  ></textarea>
                   {Formik.errors.remarks && Formik.touched.remarks ? (<p className="text-sm text-red-600">{Formik.errors.remarks as any}</p>):null}
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
