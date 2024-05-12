'use client'
import React from "react";
import Link from "next/link";

import UserSidebar from "@/components/student/UserSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ProfileSettings() {
  interface StudentData {
    'full_name': string;
    'email': string;
    'username': string;
    'interested_categories': string;
    'profile_img': any;
    'p_img': any;
  }
  const [studentData, setstudentData] = useState<StudentData>({
    'full_name': "",
    'email': "",
    'username': "",
    'interested_categories': "",
    'profile_img': "",
    'p_img': "",
  });
  const studentId = localStorage.getItem('studentId');
  useEffect(() => {
    // fetch current teacher data
    axios
      .get(`http://127.0.0.1:8000/api/student/${studentId}`)
      .then((response) => {
       
        console.log("this is the student data",response.data)
        setstudentData({
          full_name: response.data.full_name,
          email: response.data.email,
          username: response.data.username,
          interested_categories: response.data.interested_categories,
          profile_img: response.data.profile_img,
          p_img: '',
        });
        console.log("this is change",studentData)
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching course data:", error);
      });
  }, []);
  useEffect(()=>{
    document.title="Student Profile"
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setstudentData({
      // we pass referance studentData and then change our name and value acording to event 
      ...studentData,
      [event.target.name]: event.target.value
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file from the input
      setstudentData({
        ...studentData,
        profile_img: file, // Set the file directly to the featured_img field
        p_img: URL.createObjectURL(file), // Set the preview image URL
      });
    }
  };
  

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentFormData = new FormData();
  
    studentFormData.append("full_name", studentData.full_name);
    studentFormData.append("email", studentData.email);
    studentFormData.append("username", studentData.username);
    studentFormData.append("interested_categories", studentData.interested_categories);
    if (studentData.p_img !== "") {
      studentFormData.append("profile_img", studentData.p_img);
    }else{
      studentFormData.append("p_img", studentData.p_img);

    }

    try {
      // console.log("here course form data", [...studentFormData.entries()]);

      axios
        .put(
          `http://127.0.0.1:8000/api/student/${studentId}/`,
          studentFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            Swal.fire({
              title: "Data has been Updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log(studentData)
   
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
            <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                <div className="col-sm-10">
                  <input
                     name="full_name"
                    onChange={handleChange}
                    value={studentData.full_name}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                <div className="col-sm-10">
                  <input
                   name="email"
                   onChange={handleChange}
                   value={studentData.email}
                    type="email"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Profile Photo
                </label>
                <div className="col-sm-10">
                <div className="col-sm-10">
                  <input
                   name="p_img"
                   onChange={handleFileChange}
                    type="file"
                    className="form-control"
                    id="inputPassword"
                  />
                   {studentData.profile_img && 
                  <div>
                    <img
                       
                      src={studentData.profile_img}
                      width="300"
                      alt={studentData.full_name}
                      className="img-fluid"
                    />
                  </div>
                }
                </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                <div className="col-sm-10">
                  <input
                   name="email"
                   onChange={handleChange}
                   value={studentData.username}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
                </div>
              </div>
             
              <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Intrest
                </label>
                <div className="col-sm-10">
                  <input
                    name="interested_categories"
                    onChange={handleChange}
                    value={studentData.interested_categories
                    }
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
                <hr />
                <button className="btn btn-primary" onClick={submitForm as any}>Update</button>
          
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileSettings;
