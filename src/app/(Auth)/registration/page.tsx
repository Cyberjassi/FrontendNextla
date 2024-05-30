"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import  validationSchema  from './YupTeacher'
import { useRouter } from "next/navigation";



function TeacherRegister() {
  useEffect(() => {
    document.title = "Auth Registeration";
  }, []);
  const router  = useRouter()
  interface TeacherData {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    qualification: string;
    mobile_no: string;
    skills: string;
    otp_digit: string|number;
    profile_img: string | File;
    verify_status: boolean;
    status: boolean | string;
  }

  const [check, setCheck] = useState<String>("Student");
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [errorEmail,setErrorEmail] = useState<String>("");
  const [teacherData, setTeacherData] = useState<TeacherData>({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
    otp_digit: "",
    profile_img: "",
    verify_status: false,
    status: false,
  });
  

  const handleChangeTeacher = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: [event.target.value],
    });
  };

  const handleTeacherFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setTeacherData({
        ...teacherData,
        profile_img: file, 
      });
    }
  };

  const  submitFormTeacher = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
   
    const otp_digit: number = Math.floor(100000 + Math.random() * 900000);
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("password", teacherData.password);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    teacherFormData.append("profile_img", teacherData.profile_img);
    teacherFormData.append("otp_digit", otp_digit as any);

    const isValid = await validationSchema.isValid(teacherFormData)

    console.log("this is from validation",isValid)
    try {
     const res= await axios
        .post(`${process.env.BASE_URL}teacher/`, teacherFormData)
        .then((response:any) => {
          console.log(response.data);
          if (response.status === 400 && response.data) {
            setErrorMsg(response.data);
          } else {
            // No errors, redirect or perform other actions
            window.location.href=`/verify-teacher/${response.data.id}/`;
          }

        });

      

    } catch (error:any) {
      setTeacherData({ ...teacherData, status: "error" });
      console.log(error);
    }
  };
  
console.log("this is error from email ",errorMsg)
  interface studentData {
    full_name: string;
    email: string;
    password: string;
    username: string;
    profile_img:string|File;
    interested_categories: string;
    otp_digit: string|number;
    verify_status: boolean;
    status: boolean | string;
    confirm_password: string;
  }

  const [studentData, setstudentData] = useState<studentData>({
    full_name: "",
    email: "",
    password: "",
    username: "",
    profile_img:"",
    interested_categories: "",
    otp_digit:"",
    confirm_password:"",
    verify_status: false,
    status: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setstudentData({
        ...studentData,
        profile_img: file, 
      });
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(studentData.status);

    e.preventDefault();
    const otp_digit: number = Math.floor(100000 + Math.random() * 900000);
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", studentData.full_name);
    teacherFormData.append("email", studentData.email);
    teacherFormData.append("password", studentData.password);
    teacherFormData.append("username", studentData.username);
    teacherFormData.append("profile_img", studentData.profile_img);
    teacherFormData.append("interested_categories", studentData.interested_categories);
    teacherFormData.append("otp_digit", otp_digit as any);
  

    try {
      axios
        .post(`${process.env.BASE_URL}student/`, teacherFormData)
        .then((response) => {
          console.log(response.data);
          window.location.href=`/verify-student/${response.data.id}/`
        });
      console.log(studentData.status);
    } catch (error) {
      setstudentData({ ...studentData, status: "error" });
      console.log(studentData.status);
      console.log(error);
    }
  };

 console.log("this is student handlechange",studentData)
 console.log("this is teacher handlechange",teacherData)
  return (
    <div>
      <div className="container mt-10">
        <div className="row">
          <div className="col-6 offset-3">
            {/* {teacherData.status == "success" && (
              <p className="text-success">Thanks for Your Registeration</p>
            )}
            {teacherData.status == "error" && (
              <p className="text-danger">Something Wrong Happen</p>
            )} */}
           {errorMsg && <p className="text-danger">{errorMsg}</p>}
           {errorEmail && <p className="text-danger">{errorEmail}</p>}
            <div className="card shadow">
              <h3 className="card-header"> Regsiteration Form</h3>
              <div className="card-body">
                {/* submit the data thorugh form onsubmit */}
                {/* if we select teacher then that display other wise student form--- */}
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Register For
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
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Student
                  </label>
                </div>
                {check == "Teacher" && (
                  <form onSubmit={submitFormTeacher}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Full Name
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        value={teacherData.full_name}
                        name="full_name"
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Full Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        value={teacherData.email}
                        placeholder="Enter Your Email"
                        name="email"
                        type="email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Profile Image
                      </label>
                      <input
                        onChange={handleTeacherFileChange}
                        name="profile_img"
                        type="file"
                        className="form-control"
                        id="img"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        name="password"
                        value={teacherData.password}
                        placeholder="Enter Your Password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        name="confirm_password"
                        value={teacherData.confirm_password}
                        placeholder="Enter Your Password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Qualification
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        name="qualification"
                        value={teacherData.qualification}
                        placeholder="Enter Your Qulification"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Mobile Number
                      </label>
                      <input
                        onChange={handleChangeTeacher}
                        value={teacherData.mobile_no}
                        name="mobile_no"
                        placeholder="Enter Your Mobile No."
                        type="integer"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Skills
                      </label>
                      <textarea
                        value={teacherData.skills}
                        placeholder="Enter Your Skills ...."
                        onChange={handleChangeTeacher}
                        name="skills"
                        className="form-control"
                      ></textarea>
                      <div id="emailHelp" className="form-text">
                        Php,Python,JavaScript,etc
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary ccard">
                      Register
                    </button>
                  </form>
                )}

                {check == "Student" && (
                  <form onSubmit={submitForm}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Full Name
                      </label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter Your Name"
                        value={studentData.full_name}
                        name="full_name"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email
                      </label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        value={studentData.email}
                        name="email"
                        type="email"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Profile Image
                      </label>
                      <input
                        onChange={handleFileChange}
                        name="profile_img"
                        type="file"
                        className="form-control"
                        id="img"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        onChange={handleChange}
                        placeholder="Enter Your Username"
                        value={studentData.username}
                        name="username"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        onChange={handleChange}
                        value={studentData.password}
                        placeholder="Enter Your Password"
                        name="password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={handleChange}
                        value={studentData.confirm_password}
                        placeholder="Enter Your Password"
                        name="confirm_password"
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Intrests
                      </label>
                      <textarea
                        onChange={handleChange}
                        placeholder="Enter Your Intrests"
                        className="form-control"
                        value={studentData.interested_categories}
                        name="interested_categories"
                      ></textarea>
                      <div id="emailHelp" className="form-text">
                        Php,Python,JavaScript,etc
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary ccard">
                      Register
                    </button>
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

export default TeacherRegister;
