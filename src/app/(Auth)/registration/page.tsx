'use client'
import { useEffect,useState } from "react"
import axios from "axios"
import studentRegister from "@/app/user/registration/page"

// use for set title in next app
function TeacherRegister() {
  useEffect(() => {
    document.title = "Auth Registeration"
  }, [])
  const [check,setCheck] = useState<String>("Student")
  interface TeacherData {
    'full_name': string;
    'email': string;
    'password': string;
    'qualification': string;
    'mobile_no': string;
    'skills': string;
    'otp_digit': string;
    'profile_img': string | File;
    'teacher_courses': number[];
    'verify_status': boolean;
    'status': boolean|string;
  }
  const [teacherData, setTeacherData] = useState<TeacherData>({
    'full_name': "",
    'email': "",
    'password': "",
    'qualification': "",
    'mobile_no': "",
    'skills': "",
    'otp_digit': "123",
    'profile_img': "",
    'teacher_courses': [4],
    'verify_status': false,
    'status': false
  });

  const handleChangeTeacher = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setTeacherData({
      // we pass referance teacherData and then change our name and value acording to event 
      ...teacherData,
      [event.target.name]: [event.target.value]
    });
  };

  const submitFormTeacher = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(teacherData.status)
    e.preventDefault();
    const teacherFormData = new FormData();
    Object.entries(teacherData).forEach(([key, value]) => {
      teacherFormData.append(key, value as string | Blob);
    });
  try{
    axios.post("http://127.0.0.1:8000/api/teacher/", teacherFormData)
      .then((response) => {
        console.log(response.data);
        setTeacherData(
          {
            'full_name': "",
            'email': "",
            'password': "",
            'qualification': "",
            'mobile_no': "",
            'skills': "",
            'otp_digit': "123",
            'profile_img': "",
            'teacher_courses': [4],
            'verify_status': true,
            'status': 'success'
          }
        )
        // if(response.data.bool==true){
        //   localStorage.setItem('teacherLoginStatus','true')
          window.location.href='/teacher/login'
        // }
      })
      console.log(teacherData.status)
    }catch(error){
      setTeacherData({...teacherData,status:'error'})
      console.log(teacherData.status)
      console.log(error);
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus == 'true'){
      window.location.href='/teacher/login'
    }
  };



  interface studentData {
    'full_name': string;
    'email': string;
    'password': string;
    'username': string;
    'interested_categories': string; 
    'status': boolean|string;
  }

  const [studentData, setstudentData] = useState<studentData>({
    'full_name': "",
    'email': "",
    'password': "",
    'username': "",
    'interested_categories': "",
    'status':false
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setstudentData({
      // we pass referance studentData and then change our name and value acording to event 
      ...studentData,
      [event.target.name]: event.target.value
    });
  };


  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(studentData.status)
    e.preventDefault();
    const teacherFormData = new FormData();
    Object.entries(studentData).forEach(([key, value]) => {
      teacherFormData.append(key, value as string | Blob);
    });
  
  try{
    
    axios.post("http://127.0.0.1:8000/api/student/", teacherFormData)
      .then((response) => {
        console.log(response.data);
        setstudentData(
          {
            'full_name': "",
            'email': "",
            'password': "",
            'username': "",
            'interested_categories': "",
            'status': "success",
          }
        )
        if(response.data.bool==true){
          localStorage.setItem('studentLoginStatus','true')
          window.location.href='/student/login'
        }
      })
      console.log(studentData.status)
      
    }catch(error){
      setstudentData({...studentData,status:'error'})
      console.log(studentData.status)
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus == 'true'){
      window.location.href='/student/login'
    }
  };
  
console.log("this is check",check)
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            {teacherData.status == "success" && (
              <p className="text-success">Thanks for Your Registeration</p>
            )}
            {teacherData.status == "error" && (
              <p className="text-danger">Something Wrong Happen</p>
            )}
            <div className="card">
              <h3 className="card-header">Teacher Regsiteration Form</h3>
              <div className="card-body">
                {/* submit the data thorugh form onsubmit */}
                {/* if we select teacher then that display other wise student form--- */}
                   <label htmlFor="exampleInputEmail1" className="form-label">
                      Register For
                    </label><br />
                  <div className="form-check form-check-inline mb-3">
                    {/* radio button */}
                    
                    <input
                      onChange={(e)=>setCheck(e.target.value)}
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
                      onChange={(e)=>setCheck(e.target.value)}
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
                {check == "Teacher" &&
                <form onSubmit={submitFormTeacher}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
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
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
                }
                {check == "Student" &&
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
                      Username
                    </label>
                    <input
                    onChange={handleChange}
                     value={studentData.username}
                     name="username"
                      type="text"
                      className="form-control"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                    onChange={handleChange}
                    value={studentData.password}
                     name="password"
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
                    className='form-control'
                    value={studentData.interested_categories}
                     name="interested_categories"
                     ></textarea>
                    <div id="emailHelp" className="form-text">Php,Python,JavaScript,etc</div>
                   
                  </div>
                 
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister