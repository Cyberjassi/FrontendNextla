"use client";
import { useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import cookies from "js-cookie";

function TeacherChangePassword() {
  interface TeacherData {
    password: string;
  }
  const [teacherData, setTeacherData] = useState<TeacherData>({
    password: "",
  });
  const teacherId = localStorage.getItem("teacherId");
  const handleChangeTeacher = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append("password", teacherData.password);
    try {
      const token = cookies.get("token");
      const response = await axios
        .post(
          `${process.env.BASE_URL}teacher/change-password/${teacherId}/`,
          teacherFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          setTeacherData({password:""})
          console.log(response.data);
          if (response.status == 200) {
            Swal.fire({
              title: "Data has been added",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          } else {
            alert("Oops Some Error Occure!");
          }
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        Swal.fire({
          title: "Error",
          text: "Failed to update data",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      console.log(error);
    }
  };

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header text-center bg-primary text-white">
              Change Password
            </h5>
            <div className="card-body">
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
                    value={teacherData.password}
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
