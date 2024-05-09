'use client'
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryInfo } from "@/app/redux/Category/CategoryRetriew";
import axios from "axios";
import Swal from "sweetalert2";

import TeacherSidebar from "@/components/Teacher/Sidebar";

function TeacherProfileSettings() {
  
  interface TeacherData {
    'full_name': string;
    'email': string;
    'qualification': string;
    'mobile_no': string;
    'skills': string;
    'profile_img': any;
    'p_img': any;
  }
  const [teacherData, setTeacherData] = useState<TeacherData>({
    'full_name': "",
    'email': "",
    'qualification': "",
    'mobile_no': "",
    'skills': "",
    'profile_img': "",
    'p_img': "",
  });
  const teacherId = localStorage.getItem('teacherId');
  useEffect(() => {
    // fetch current teacher data
    axios
      .get(`http://127.0.0.1:8000/api/teacher/${teacherId}`)
      .then((response) => {
       
        console.log("this is the teacher data",response.data)
        setTeacherData({
          full_name: response.data.full_name,
          email: response.data.email,
          qualification: response.data.qualification,
          mobile_no: response.data.mobile_no,
          skills: response.data.skills,
          profile_img: response.data.profile_img,
          p_img: '',
        });
        console.log("this is change",teacherData)
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching course data:", error);
      });
  }, []);


  const handleChangeTeacher = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setTeacherData({
      // we pass referance teacherData and then change our name and value acording to event 
      ...teacherData,
      [event.target.name]: event.target.value
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file from the input
      setTeacherData({
        ...teacherData,
        profile_img: file, // Set the file directly to the featured_img field
        p_img: URL.createObjectURL(file), // Set the preview image URL
      });
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teacherFormData = new FormData();
  
    teacherFormData.append("full_name", teacherData.full_name);
    teacherFormData.append("email", teacherData.email);
    teacherFormData.append("qualification", teacherData.qualification);
    teacherFormData.append("mobile_no", teacherData.mobile_no);
    teacherFormData.append("skills", teacherData.skills);
    if (teacherData.p_img !== "") {
      teacherFormData.append("profile_img", teacherData.p_img);
    }else{
      teacherFormData.append("p_img", teacherData.p_img);

    }

    try {
      // console.log("here course form data", [...teacherFormData.entries()]);

      axios
        .put(
          `http://127.0.0.1:8000/api/teacher/${teacherId}/`,
          teacherFormData,
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
   
  };

console.log(teacherData)
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label
                //  for="staticEmail"
                  className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <div className="col-sm-10">
                    <input
                      name="full_name"
                      onChange={handleChangeTeacher}
                      value={teacherData.full_name}
                      type="text"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="staticEmail"
                 className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <div className="col-sm-10">
                    <input
                     name="email"
                     onChange={handleChangeTeacher}
                     value={teacherData.email}
                      type="email"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Profile Image
                </label>
                <input
                  onChange={handleFileChange}
                  name="p_img"
                  type="file"
                  className="form-control"
                  id="video"
                />
                {teacherData.profile_img && 
                  <div>
                    <img
                       
                      src={teacherData.profile_img}
                      width="300"
                      alt={teacherData.full_name}
                      className="img-fluid"
                    />
                   <p>remain</p>
                  </div>
                }
              </div>
              <div className="mb-3 row">
                <label 
                // for="inputPassword" 
                className="col-sm-2 col-form-label">
                  Skills
                </label>
                <div className="col-sm-10">
                  <textarea
                     name="skills"
                     value={teacherData.skills}
                     onChange={handleChangeTeacher}
                    className="form-control"
                    id="floatingTextarea2"
                  ></textarea>
                  <div id="emailHelp" className="form-text">Php,Python,Javascript,etc</div>
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="inputPassword" 
                className="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div className="col-sm-10">
                  <textarea
                  value={teacherData.qualification}
                    name="qualification"
                    onChange={handleChangeTeacher}
                    className="form-control"
                    id="floatingTextarea2"
                  ></textarea>
                  <div id="emailHelp" className="form-text">BCA | MCA | B.Tech</div>
                </div>
              </div>
              <hr />
              <button onClick={submitForm as any} className="btn btn-primary">Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSettings;
<div className="form-floating">
  <textarea
    className="form-control"
    placeholder="Leave a comment here"
    id="floatingTextarea2"
  ></textarea>
</div>;
