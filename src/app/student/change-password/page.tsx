"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserSidebar from "@/components/student/UserSidebar";

function TeacherChangePassword() {
  interface studentData {
    password: string;
  }
  const [studentData, setstudentData] = useState<studentData>({
    password: "",
  });
  const studentId = localStorage.getItem("studentId");
  const handleChangeTeacher = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append("password", studentData.password);
    try {
      axios
        .post(
          `${process.env.BASE_URL}student/change-password/${studentId}/`,
          studentFormData
        )
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            window.location.href = "/logout";
            Swal.fire({
              title: "Password has been Updated",
              icon: "success",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          } else {
            alert("Oops Some Error Occure!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              Change Password
            </h5>
            <div className="card-body shadow">
              <div className="mb-3 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 col-form-label"
                >
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    name="password"
                    value={studentData.password}
                    onChange={handleChangeTeacher}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <hr />
              <button
                className="btn btn-primary ccard"
                onClick={submitForm as any}
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherChangePassword;
