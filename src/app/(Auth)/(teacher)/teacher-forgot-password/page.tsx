'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
// import navigateTo from "@/app/utils/navigation";
// import { useRouter } from 'next/navigation'
import Link from "next/link";

function FogotPassword() {

  // const router = useRouter()
 useEffect(()=>{
  document.title='Teacher Forgot Password'
 })

interface TeacherData {
  'email': string;

}

const [teacherData, setTeacherData] = useState<TeacherData>({
  'email': "",

});

const [errorMsg,setErrorMsg] = useState("");
const [successMsg,setSuccessMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setTeacherData({
    // we pass referance teacherData and then change our name and value acording to event 
    ...teacherData,
    [event.target.name]: event.target.value
  });
};
console.log(teacherData)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  // console.log(teacherData.status)
  e.preventDefault();
  const teacherFormData = new FormData();
  teacherFormData.append('email', teacherData.email);
  // teacherFormData.append('password', teacherData.password);
try{
  // console.log(teacherFormData)
  axios.post("http://127.0.0.1:8000/api/teacher-forgot-password/", teacherFormData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      if(response.data.bool==true){
        setSuccessMsg(response.data.msg)
        setErrorMsg('');
        teacherData.email=''

      }else{
        setErrorMsg(response.data.msg)
        setSuccessMsg('')
      }
    })
  }catch(error){
    // setTeacherData({...teacherData,status:'error'})
    // console.log(teacherData.status)
    console.log(error);
  }
  
};



  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header">  Enter Your Registered Email</h5>
              <div className="card-body">
                {successMsg && <p className="text-success">{successMsg}</p>}
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <form onSubmit={submitForm}>
               
                  <div className="mb-3">
                    <label
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                     Email
                    </label>

                    <input  name="email" type="email"   
                    onChange={handleChange} 
                    value={teacherData.email}

                    placeholder="Enter Your Email"
                     className="form-control" />
                  </div>
                  <button type="submit"
                   className="btn btn-primary">
                    Send Email
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

export default FogotPassword;
