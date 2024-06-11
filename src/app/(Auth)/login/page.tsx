"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Swal from "sweetalert2";
import {handleApiError} from '../../errorHandling'
import logout from '../logout/logout'


function TeacherLogin() {
  const router = useRouter()
  useEffect(() => {
    document.title = "Login";
  });


  const [check, setCheck] = useState<String>("Student");
  const [forgotStatus,setforgotStatus] = useState<boolean>(false)

  interface TeacherData {
    email: string;
    password: string;
  }

  const [teacherData, setTeacherData] = useState<TeacherData>({
    email: "",
    password: "",
  });



  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setforgotStatus(false)
    setTeacherData({
      // we pass referance teacherData and then change our name and value acording to event
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(teacherData);


  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(teacherData.status)
    e.preventDefault();
    // const teacherFormData = new FormData();
    // teacherFormData.append('email', teacherData.email);
    // teacherFormData.append('password', teacherData.password);
    try {
      // console.log(teacherFormData)
    const response =  await axios.post(`${process.env.BASE_URL}teacher-login/`, teacherData)
        
          console.log(response.data);
          // if backend server response bool is true then we set in local storage
          //  then we redirect to teacher dashboard and set it true
          if (response.data.bool == true) {
            localStorage.setItem("teacherLoginStatus", "true");
            // set teacher id in local storage for future use---
            localStorage.setItem("teacherId", response.data.teacher_id);
            // localStorage.setItem("token", response.data.token["access"]);
            const token = response.data.token["access"];
            document.cookie ="userType=teacher; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            
            window.location.href="/teacher/dashboard";
            
          } else {
            handleApiError(response.data.msg)
            setforgotStatus(true)
          }
        
    } catch (error) {
      // setTeacherData({...teacherData,status:'error'})
      // console.log(teacherData.status)
      console.log(error);
    }
    // get the localStorage data if it's true then redirect to teacher dashboard
    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
    // if (teacherLoginStatus == "true") {
    //   router.push("/teacher/dashboard");
    // }
  };

  // student login--
  interface StudentData {
    email: string;
    password: string;
  }

  const [StudentData, setStudentData] = useState<StudentData>({
    email: "",
    password: "",
  });
  

  const handleChangeStudent = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setforgotStatus(false)
    setStudentData({
      // we pass referance StudentData and then change our name and value acording to event
      ...StudentData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(StudentData);
  console.log(check);

  const submitFormStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // console.log(StudentData.status)
    
    // const teacherFormData = new FormData();
    // teacherFormData.append('email', StudentData.email);
    // teacherFormData.append('password', StudentData.password);
    try {
      
      
      // console.log(teacherFormData)
     const response = await axios.post(`${process.env.BASE_URL}student-login/`, StudentData)
        
          console.log(response.data);
          // if backend server response bool is true then we set in local storage
          //  then we redirect to teacher dashboard and set it true
          if (response.data.bool == true) {
            localStorage.setItem("studentLoginStatus", "true");
            // set teacher id in local storage for future use---
            localStorage.setItem("studentId", response.data.student_id);
            // localStorage.setItem("token", response.data.token["access"]);
            const token = response.data.token["access"];
            document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            document.cookie = "userType=student; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            
            window.location.href="/student/dashboard";
          } else {
            handleApiError(response.data.msg);
            setforgotStatus(true)
          }
    }catch (error:any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-10">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card shadow">
              <h5 className="card-header">Login</h5>
              <div className="card-body">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Login For
                </label>
                <br />
                <div className="form-check form-check-inline mb-3">
                  {/* radio button */}

                  <input
                    onChange={(e) => setCheck(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="Teacher"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Teacher
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onChange={(e) => setCheck(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="Student"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Student
                  </label>
                </div>
                {check == "Teacher" && (
                  <form onSubmit={submitForm}>
                    <div className="mb-3">
                      <label
                        //   for="exampleInputEmail1"
                        className="form-label text-start"
                      >
                        Email
                      </label>

                      <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={teacherData.email}
                        placeholder="Enter Your Email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        // for="exampleInputPassword1"
                        className="form-label"
                      >
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
                    <button type="submit" className="btn btn-primary ccard">
                      Login
                    </button>
              
                  {forgotStatus && 
                    <p className="mt-3">
                      <Link
                        href="/teacher-forgot-password"
                        className="text-danger link-none text-sm"
                      >
                        Forget Password?
                      </Link>
                    </p>}
                  </form>
                )}

                {check == "Student" && (
                  <form onSubmit={submitFormStudent}>
                    <div className="mb-3">
                      <label
                        //   for="exampleInputEmail1"
                        className="form-label text-start"
                      >
                        Email
                      </label>

                      <input
                        name="email"
                        type="email"
                        onChange={handleChangeStudent}
                        value={StudentData.email}
                        placeholder="Enter Your Email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="form-label"
                      >
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
                    <button type="submit" className="btn btn-primary ccard">
                      Login
                    </button>
                   
                  {forgotStatus && 
                    <p className="mt-3">
                      <Link
                        href="/student-forgot-password"
                        className="text-danger link-none text-sm"
                      >
                        Forget Password?
                      </Link>
                    </p>}
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
