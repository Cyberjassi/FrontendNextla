"use client";
import React from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryInfo } from "@/app/redux/Category/CategoryRetriew";
import axios from "axios";
import Swal from "sweetalert2";
import cookies from "js-cookie";

function EditCourse(props: any) {
  interface CourseData {
    category: any;
    title: string;
    description: string;
    featured_img: File | string | any;
    prev_img: File | string | any;
    techs: string;
  }
  const [CourseData, setCourseData] = useState<CourseData>({
    category: "",
    title: "",
    description: "",
    prev_img: "",
    featured_img: "",
    techs: "",
  });
  const currentCourse = props.params["course-id"];
  const teacherId = localStorage.getItem("teacherId");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryInfo() as any);
    axios
      .get(`${process.env.BASE_URL}teacher-courses-detail/${currentCourse}`)
      .then((response) => {
        console.log("this is res", response);
        setCourseData(response.data);
        setCourseData({
          category: response.data.category,
          title: response.data.title,
          description: response.data.description,
          prev_img: response.data.featured_img,
          featured_img: "",
          techs: response.data.techs,
        });
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);
  const state = useSelector((state: any) => state);
  let dataCategory = state.category.data;

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCourseData({
      ...CourseData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setCourseData({
        ...CourseData,
        featured_img: file,
        prev_img: URL.createObjectURL(file),
      });
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const courseFormData = new FormData();
    courseFormData.append("category", CourseData.category);
    courseFormData.append("teacher", teacherId as any);
    courseFormData.append("title", CourseData.title);
    courseFormData.append("description", CourseData.description);
    if (CourseData.featured_img !== "") {
      courseFormData.append("featured_img", CourseData.featured_img);
    }
    courseFormData.append("techs", CourseData.techs);
    try {
      const token = cookies.get("token");
      axios
        .put(
          `${process.env.BASE_URL}teacher-courses-detail/${currentCourse}`,
          courseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
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

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header text-center bg-primary text-white">
              Edit Course
            </h5>
            <form onSubmit={submitForm} className="container mt-3">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Category
                </label>
                <select
                  onChange={handleChange}
                  name="category"
                  className="form-control"
                  value={CourseData.category}
                >
                  {state.category.isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    dataCategory &&
                    dataCategory.map((category: any, index: any) => (
                      <option key={index} value={category.id}>
                        {category.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Title
                </label>
                <input
                  value={CourseData.title}
                  onChange={handleChange}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    value={CourseData.description}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Featured Image
                </label>
                <input
                  onChange={handleFileChange}
                  name="featured_img"
                  type="file"
                  className="form-control"
                  id="video"
                />
                {CourseData.prev_img && (
                  <div>
                    <img
                      src={CourseData.prev_img}
                      width="300"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Technologies
                </label>
                <div className="form-floating">
                  <textarea
                    value={CourseData.techs}
                    onChange={handleChange}
                    name="techs"
                    className="form-control"
                    placeholder="Php,Python,Javascript,HTML,CSS,Javascript"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditCourse;
