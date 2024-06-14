'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";
import { handleApiError } from "@/app/errorHandling";
import {useFormik} from "formik"
import * as Yup from 'yup';

function StudentChangPassword(props:any) {

 const route = useRouter()
 const student_id = props.params['student-id']
 useEffect(()=>{
  document.title='Student Change Password'
 })

const [successMsg,setSuccessMsg] = useState("");

let initialvalues = {
  password: "",
}
const formik = useFormik({
initialValues:initialvalues,
validationSchema:Yup.object({
  password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
        .matches(/^(?!\s)(?=.*[A-Z])/, 'Password must not begin with a space and contain at least one uppercase letter'),
}),
onSubmit: async (values:any, { setSubmitting }) => {
  try {
    await submitForm(values);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setSubmitting(false);
  }
},
})

const submitForm = async (values:any) => {
  const StudentFormData = new FormData();
  StudentFormData.append('password', values.password);
  const response = await axios.post(`${process.env.BASE_URL}student-change-password/${student_id}/`, StudentFormData)
    .then((response) => {
      console.log(response.data);
      if(response.data.bool==true){
        setSuccessMsg(response.data.msg)
        route.push('/login')
      }
      else{
        handleApiError(response.data.msg)
        setSuccessMsg('')
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.msg);
        handleApiError(error.response.data.msg);
        setSuccessMsg('');
      }
    });
};



  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header text-center bg-primary text-white">  Enter Your Password</h5>
              <div className="card-body">
                {successMsg && <p className="text-success">{successMsg}</p>}
                
                <form onSubmit={formik.handleSubmit}>
               
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label text-start"
                    >
                     Enter Your Password
                    </label>
                    <input  name="password" type="password"   
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Password" className="form-control" />
                    {formik.errors.password && formik.touched.password ? (<p className="text-sm text-red-600">{formik.errors.password as any}</p>):null}
                  </div>
                  <button type="submit"
                   className="btn btn-primary">
                    Change
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentChangPassword;
