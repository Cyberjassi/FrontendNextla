'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryInfo } from "@/app/redux/Category/CategoryRetriew";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "@/components/Teacher/Sidebar";


function TeacherChangePassword() {
  interface TeacherData {
    'password': string;
    
  }
  const [teacherData, setTeacherData] = useState<TeacherData>({
    'password': "",
  });
  const teacherId = localStorage.getItem('teacherId');
  const handleChangeTeacher = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setTeacherData({
      // we pass referance teacherData and then change our name and value acording to event 
      ...teacherData,
      [event.target.name]: event.target.value
    });
  };


  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teacherFormData = new FormData();
  
    teacherFormData.append("password", teacherData.password);
    
    try {
      axios
        .post(
          `http://127.0.0.1:8000/api/teacher/change-password/${teacherId}/`,
          teacherFormData,
        )
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            window.location.href='/logout'
            Swal.fire({
              title:'Data has been added',
              icon:'success',
              toast:true,
              timer: 5000,
              position:'top-right',
              timerProgressBar:true,
              showConfirmButton: false,
            });          }else{
            alert("Oops Some Error Occure!")
          }
          

        });
    } catch (error) {
      console.log(error);
      // setTeacherData({'status':'error'})
    }
   
  };
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
             {/* {errorMsg && <p className="text-danger">{errorMsg}</p>} */}
            
              <div className="mb-3 row">
                <label 
                // for="inputPassword" 
                className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                  name="password"
                  value={teacherData.password}
                  onChange={handleChangeTeacher}
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

export default TeacherChangePassword;
