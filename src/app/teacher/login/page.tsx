'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
function TeacherLogin() {
 useEffect(()=>{
  document.title='Teacher Login'
 })



interface TeacherData {
  'email': string;
  'password': string;
}


const [teacherData, setTeacherData] = useState<TeacherData>({
  'email': "",
  'password': "",
});


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
  // const teacherFormData = new FormData();
  // teacherFormData.append('email', teacherData.email);
  // teacherFormData.append('password', teacherData.password);
try{
  // console.log(teacherFormData)
  axios.post("http://127.0.0.1:8000/api/teacher-login/", teacherData)
    .then((response) => {
      console.log(response.data);
      setTeacherData(
        {
          'email': "",
          'password': "",
        }
      )
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      if(response.data.bool==true){
        localStorage.setItem('teacherLoginStatus',true)
        // set teacher id in local storage for future use---
        localStorage.setItem('teacherId',response.data.teacher_id)
        window.location.href='/teacher/dashboard'
      }
    })

  }catch(error){
    // setTeacherData({...teacherData,status:'error'})
    // console.log(teacherData.status)
    console.log(error);
  }
 

  // get the localStorage data if it's true then redirect to teacher dashboard
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if(teacherLoginStatus == 'true'){
    window.location.href='/teacher/dashboard'
  }
};
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h3 className="card-header">User Login</h3>
              <div className="card-body">
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
                    placeholder="Enter Your Email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label 
                    // for="exampleInputPassword1" 
                    className="form-label">
                      Password
                    </label>
                    <input
                    placeholder="Enter Your Password" 
                    onChange={handleChange}
                    value={teacherData.password}
                    name="password"
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  {/* <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Remember me
                    </label>
                  </div> */}
                  <button type="submit"
                
                   className="btn btn-primary">
                    Login
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

export default TeacherLogin;
