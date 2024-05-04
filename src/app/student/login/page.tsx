'use client'
import { useEffect,useState } from "react";
import axios from 'axios'

function StudentLogin() {

interface StudentData {
  'email': string;
  'password': string;
}


const [StudentData, setStudentData] = useState<StudentData>({
  'email': "",
  'password': "",
});

const [errorMsg,setErrorMsg] = useState("");


const handleChangeStudent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setStudentData({
    // we pass referance StudentData and then change our name and value acording to event 
    ...StudentData,
    [event.target.name]: event.target.value
  });
};
console.log(StudentData)

const submitFormStudent = (e: React.FormEvent<HTMLFormElement>) => {
  // console.log(StudentData.status)
  e.preventDefault();
  // const teacherFormData = new FormData();
  // teacherFormData.append('email', StudentData.email);
  // teacherFormData.append('password', StudentData.password);
try{
  // console.log(teacherFormData)
  axios.post("http://127.0.0.1:8000/api/student-login/", StudentData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      if(response.data.bool==true){
        localStorage.setItem('studentLoginStatus','true')
        // set teacher id in local storage for future use---
        localStorage.setItem('studentId',response.data.student_id)
        localStorage.setItem('token',response.data.token['access'])
        window.location.href='/student/dashboard'
      }else{
        setErrorMsg("Invalid Email or Password!")
      }
    })
  }catch(error){
    // setStudentData({...StudentData,status:'error'})
    // console.log(StudentData.status)
    console.log(error);
  }
  // get the localStorage data if it's true then redirect to teacher dashboard
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')
  if(studentLoginStatus == 'true'){
    window.location.href='/student/dashboard'
  }
};
return (
  <div>
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Student Login</h5>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form onSubmit={submitFormStudent}>
                <div className="mb-3">
                  <label
                  //   for="exampleInputEmail1"
                    className="form-label text-start"
                  >
                    Email
                  </label>

                  <input  name="email" type="email"   
                  onChange={handleChangeStudent} 
                  value={StudentData.email}
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
                  onChange={handleChangeStudent}
                  value={StudentData.password}
                  name="password"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
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

export default StudentLogin;
