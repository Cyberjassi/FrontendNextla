"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { handleApiError } from "../../errorHandling";
import { useFormik } from "formik";
import TeacherValidationSchema from "./YupTeacher";
import StudentValidationSchema from "./YupStudent";
import "./regisration.global.css";

function TeacherRegister() {
  useEffect(() => {
    document.title = "Registration";
  }, []);
  const [check, setCheck] = useState<String>("Student");
  const [teacherData, setTeacherData] = useState<any>("");
  const [studentData, setstudentData] = useState<any>("");

  // teacher-
  const handleFileChangeTeacher = (
    event: React.ChangeEvent<HTMLInputElement | any>
  ) => {
    const file = event.target.files[0];
    if (file) {
      const uploadPreviewUrl = window.URL.createObjectURL(file);
      setTeacherData({
        ...teacherData,
        profile_img: file,
      });
    }
  };
  let initialValues = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    qualification: "",
    mobile_no: "",
    skills: "",
  };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: TeacherValidationSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      try {
        await submitFormTeacher(values);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  //formikend
  const submitFormTeacher = async (values: any) => {
    Swal.fire({
      title: "Wait a moment....",
      html: '<div class="full-screen-toast"><div class="loader"></div></div>',
      icon: "warning",
      toast: true,
      timer: 8000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "full-screen-popup",
      },
    });
    const otp_digit: number = Math.floor(100000 + Math.random() * 900000);
    const teacherFormData = new FormData();
    teacherFormData.append("full_name", values.full_name);
    teacherFormData.append("email", values.email);
    teacherFormData.append("password", values.password);
    teacherFormData.append("qualification", values.qualification);
    teacherFormData.append("mobile_no", values.mobile_no);
    teacherFormData.append("skills", values.skills);
    {
      teacherData.profile_img &&
        teacherFormData.append("profile_img", teacherData.profile_img);
    }
    teacherFormData.append("otp_digit", otp_digit as any);
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}teacher/`,
        teacherFormData
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        window.location.href = `/verify-teacher/${response.data.id}/`;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("Error:", error.response.data);
        const errorData = error.response.data;
        const errorMessages = [];
        if (errorData.email) {
          errorMessages.push(errorData.email[0]);
        }
        if (errorData.mobile_no) {
          errorMessages.push(errorData.mobile_no[0]);
        }
        if (errorData.profile_img) {
          errorMessages.push(errorData.profile_img[0]);
        }
        if (errorMessages.length > 0) {
          handleApiError(errorMessages);
        }
      } else {
        console.error("Error:", error);
      }
    }
  };
  // teacher end

  //student-
  let initialvalues = {
    full_name: "",
    email: "",
    password: "",
    username: "",
    interested_categories: "",
    confirm_password: "",
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: StudentValidationSchema,
    onSubmit: async (values: any, { setSubmitting }) => {
      try {
        await submitForm(values);
        Formik.resetForm();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setstudentData({
        ...studentData,
        profile_img: file,
      });
    }
  };
  const submitForm = async (values: any) => {
    Swal.fire({
      title: "Wait a moment....",
      html: '<div class="full-screen-toast"><div class="loader"></div></div>',
      icon: "warning",
      toast: true,
      timer: 8000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "full-screen-popup",
      },
    });
    const otp_digit: number = Math.floor(100000 + Math.random() * 900000);
    const sf = new FormData();
    sf.append("full_name", values.full_name);
    sf.append("email", values.email);
    sf.append("password", values.password);
    sf.append("username", values.username);
    {
      studentData.profile_img &&
        sf.append("profile_img", studentData.profile_img);
    }
    sf.append("interested_categories", values.interested_categories);
    sf.append("otp_digit", otp_digit as any);
    try {
      const response = await axios.post(`${process.env.BASE_URL}student/`, sf);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        window.location.href = `/verify-student/${response.data.id}/`;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("Error:", error.response.data);
        const errorData = error.response.data;
        const errorMessages = [];
        if (errorData.email) {
          errorMessages.push(errorData.email[0]);
        }
        if (errorData.profile_img) {
          errorMessages.push(errorData.profile_img[0]);
        }
        if (errorMessages.length > 0) {
          handleApiError(errorMessages);
        }
      } else {
        console.error("Error:", error);
      }
    }
  };
  console.log("this is teacher formik", Formik);
  console.log("this is student formik", formik);
  console.log("this is teacher file", teacherData);
  console.log("this is student file", studentData);
  return (
    <div>
      <div className="container mt-10">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card shadow">
              <h5 className="card-header text-center bg-primary text-white">
                Registration Form
              </h5>
              <div
                className="card-body"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                }}
              >
                <label htmlFor="registrationType" className="form-label">
                  Register As-&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
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

                {/* Form for teacher registration */}
                {check === "Teacher" && (
                  <form className="mt-2" onSubmit={Formik.handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Full Name
                          </label>
                          <input
                            value={Formik.values.full_name}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            name="full_name"
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Full Name"
                          />
                          {Formik.errors.full_name &&
                            Formik.touched.full_name && (
                              <p className="text-sm text-danger">
                                {Formik.errors.full_name as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            value={Formik.values.email}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            placeholder="Enter Your Email"
                            name="email"
                            type="email"
                            className="form-control"
                          />
                          {Formik.errors.email && Formik.touched.email && (
                            <p className="text-sm text-danger">
                              {Formik.errors.email as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Profile Image
                          </label>
                          <input
                            onChange={handleFileChangeTeacher}
                            name="profile_img"
                            type="file"
                            className="form-control"
                            id="img"
                          />
                          {Formik.errors.profile_img &&
                            Formik.touched.profile_img && (
                              <p className="text-sm text-danger">
                                {Formik.errors.profile_img as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            value={Formik.values.password}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            name="password"
                            placeholder="Enter Your Password"
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                          />
                          {Formik.errors.password &&
                            Formik.touched.password && (
                              <p className="text-sm text-danger">
                                {Formik.errors.password as any}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            value={Formik.values.confirm_password}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            name="confirm_password"
                            placeholder="Enter Your Password"
                            type="password"
                            className="form-control"
                            id="exampleInputPassword2"
                          />
                          {Formik.errors.confirm_password &&
                            Formik.touched.confirm_password && (
                              <p className="text-sm text-danger">
                                {Formik.errors.confirm_password as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Qualification
                          </label>
                          <input
                            value={Formik.values.qualification}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            name="qualification"
                            placeholder="Enter Your Qualification"
                            type="text"
                            className="form-control"
                          />
                          {Formik.errors.qualification &&
                            Formik.touched.qualification && (
                              <p className="text-sm text-danger">
                                {Formik.errors.qualification as any}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Mobile Number
                          </label>
                          <input
                            value={Formik.values.mobile_no}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            name="mobile_no"
                            placeholder="Enter Your Mobile No."
                            type="number"
                            className="form-control"
                          />
                          {Formik.errors.mobile_no &&
                            Formik.touched.mobile_no && (
                              <p className="text-sm text-danger">
                                {Formik.errors.mobile_no as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                          >
                            Skills
                          </label>
                          <textarea
                            value={Formik.values.skills}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                            placeholder="Enter Your Skills"
                            name="skills"
                            className="form-control"
                          ></textarea>
                          <div id="emailHelp" className="form-text">
                            e.g., Php, Python, JavaScript, etc
                          </div>
                          {Formik.errors.skills && Formik.touched.skills && (
                            <p className="text-sm text-danger">
                              {Formik.errors.skills as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary ccard w-100"
                    >
                      Register
                    </button>
                  </form>
                )}

                {/* Form for teacher registration */}
                {check === "Student" && (
                  <form onSubmit={formik.handleSubmit} className="mt-2">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="fullName" className="form-label">
                            Full Name
                          </label>
                          <input
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Name"
                            name="full_name"
                            type="text"
                            className="form-control"
                            id="fullName"
                          />
                          {formik.errors.full_name &&
                            formik.touched.full_name && (
                              <p className="text-sm text-danger">
                                {formik.errors.full_name as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Email"
                            name="email"
                            type="email"
                            className="form-control"
                            id="email"
                          />
                          {formik.errors.email && formik.touched.email && (
                            <p className="text-sm text-danger">
                              {formik.errors.email as any}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="profileImage" className="form-label">
                            Profile Image
                          </label>
                          <input
                            onChange={handleFileChange}
                            name="profile_img"
                            type="file"
                            className="form-control"
                            id="profileImage"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Username"
                            name="username"
                            type="text"
                            className="form-control"
                            id="username"
                          />
                          {formik.errors.username &&
                            formik.touched.username && (
                              <p className="text-sm text-danger">
                                {formik.errors.username as any}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Password"
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                          />
                          {formik.errors.password &&
                            formik.touched.password && (
                              <p className="text-sm text-danger">
                                {formik.errors.password as any}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <input
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Password"
                            name="confirm_password"
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                          />
                          {formik.errors.confirm_password &&
                            formik.touched.confirm_password && (
                              <p className="text-sm text-danger">
                                {formik.errors.confirm_password as any}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="interestedCategories"
                            className="form-label"
                          >
                            Interested Categories
                          </label>
                          <textarea
                            value={formik.values.interested_categories}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Your Interests"
                            className="form-control"
                            name="interested_categories"
                            id="interestedCategories"
                          ></textarea>
                          <div id="emailHelp" className="form-text">
                            e.g., Php, Python, JavaScript, etc
                          </div>
                          {formik.errors.interested_categories &&
                            formik.touched.interested_categories && (
                              <p className="text-sm text-danger">
                                {formik.errors.interested_categories as any}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 ccard"
                    >
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
