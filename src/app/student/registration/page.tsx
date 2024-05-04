'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function studentRegister() {
  useEffect(() => {
    document.title = "Teacher Register"
  }, [])


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
  
 console.log(studentData)
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
          {studentData.status=='success' && <p className="text-success">Thanks for Your Registeration</p>}
            {studentData.status=='error' && <p className="text-danger">Something Wrong Happen</p>}
            <div className="card">
              <h3 className="card-header">User Register</h3>
              <div className="card-body">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default studentRegister
