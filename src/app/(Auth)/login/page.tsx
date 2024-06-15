"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { handleApiError } from "../../errorHandling";

function TeacherLogin() {
  useEffect(() => {
    document.title = "Login";
  });
  const [check, setCheck] = useState<String>("Student");
  const [forgotStatus, setforgotStatus] = useState<boolean>(false);

  // teacher login-
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
    setforgotStatus(false);
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(teacherData);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}teacher-login/`,
        teacherData
      );
      console.log(response.data);
      if (response.data.bool == true) {
        localStorage.setItem("teacherLoginStatus", "true");
        localStorage.setItem("teacherId", response.data.teacher_id);
        const token = response.data.token["access"];
        document.cookie =
          "userType=teacher; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

        window.location.href = "/teacher/dashboard";
      } else {
        handleApiError(response.data.msg);
        setforgotStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
    const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
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
    setforgotStatus(false);
    setStudentData({
      ...StudentData,
      [event.target.name]: event.target.value,
    });
  };
  console.log(StudentData);
  console.log(check);
  const submitFormStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}student-login/`,
        StudentData
      );
      console.log(response.data);
      if (response.data.bool == true) {
        localStorage.setItem("studentLoginStatus", "true");
        localStorage.setItem("studentId", response.data.student_id);
        const token = response.data.token["access"];
        document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        document.cookie =
          "userType=student; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        window.location.href = "/student/dashboard";
      } else {
        handleApiError(response.data.msg);
        setforgotStatus(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-10">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card shadow">
              <h5 className="card-header text-center bg-primary text-white">
                Login
              </h5>
              <div className="card-body">
                <label htmlFor="loginAs" className="form-label">
                  Login As-
                </label>
                <br />
                <div className="form-check form-check-inline mb-3">
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
                {check === "Teacher" && (
                  <form onSubmit={submitForm} className="mt-1">
                    <div className="mb-3">
                      <label className="form-label">Email </label>
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
                      <label className="form-label">Password</label>
                      <input
                        placeholder="Enter Your Password"
                        onChange={handleChange}
                        value={teacherData.password}
                        name="password"
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                )}
                {check === "Student" && (
                  <form onSubmit={submitFormStudent} className="mt-1">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
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
                      <label className="form-label">Password</label>
                      <input
                        placeholder="Enter Your Password"
                        onChange={handleChangeStudent}
                        value={StudentData.password}
                        name="password"
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                )}
                {forgotStatus && (
                  <p className="mt-3">
                    <Link
                      href={
                        check === "Teacher"
                          ? "/teacher-forgot-password"
                          : "/student-forgot-password"
                      }
                      className="text-danger link-none text-sm"
                    >
                      Forget Password?
                    </Link>
                  </p>
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
