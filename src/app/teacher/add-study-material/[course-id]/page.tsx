'use client'
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useFormik} from "formik"
import {studyMaterialSchmea} from './studyMaterialYup'


function AddStudyMaterial(props:any) {
  const [studyData,setstudyData] = useState<any>("");

const currentCourse = props.params['course-id']


interface studyData {
  'title': string;
  'description': string;
  'upload':any;
  'remarks': string;

}



//fromik 
let initialValues = {
  title: '',
  description: '',
  remarks: ''
}
const Formik = useFormik({
  initialValues:initialValues,
  validationSchema:studyMaterialSchmea,
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

console.log("this is formik data output",Formik)


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
  const file = event.target.files[0];
  if (file) {
    const uploadPreviewUrl = window.URL.createObjectURL(file);
    setstudyData({
      ...studyData,
      [event.target.name]: file,
    });
  }
};

const submitForm = async (values:any) => {

  console.log("jalksdfjlkasdjf")
  const formData = new FormData();
  
  formData.append('course',currentCourse); 
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('upload', studyData.upload);
  formData.append('remarks', values.remarks);

  try {
    const response = await axios.post(`${process.env.BASE_URL}study-materials/${currentCourse}`, formData, {
      headers: {
                'Content-Type': 'multipart/form-data',
            }
    });

    console.log(response.data);
    if(response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Data has been added',
        icon: 'success',
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      // window.location.reload();
    }
  } catch (error) {
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
            <h5 className="card-header">Add Study Materials</h5>
            <form className="container"
            // onSubmit={submitForm}
            onSubmit={Formik.handleSubmit}
            >
              <div className="mb-3">
                <label
                //  for="exampleInputEmail1"
                  className="form-label ">
                  Title
                </label>
                <input
                  // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
                    value={Formik.values.remarks}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}

                    name="remarks"
                    className="form-control"
                    id="Remarks"
                  ></textarea>
                   {Formik.errors.remarks && Formik.touched.remarks ? (<p className="text-sm text-red-600">{Formik.errors.remarks as any}</p>):null}
                </div>
              </div>
              <button  type="submit" className="btn btn-primary">
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

