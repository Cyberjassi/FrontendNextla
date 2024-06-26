"use client";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryInfo } from "@/app/redux/Category/CategoryRetriew";
import axios from "axios";
import Swal from "sweetalert2";
import { handleApiError } from "@/app/errorHandling";
import { useFormik } from "formik";
import CoursevalidationSchema from "./YupCourse";

function AddCourse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryInfo() as any);
  }, [dispatch]);
  const state = useSelector((state: any) => state);
  console.log("this is my State", state);
  let dataCategory = state.category.data;

  const [CourseData, setCourseData] = useState<any>("");
  let initialValues = {
    title: "",
    description: "",
    price: "",
    techs: "",
  };
  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: CoursevalidationSchema,
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
      setCourseData({
        ...CourseData,
        featured_img: file,
      });
    }
  };

  const submitForm = async (values: any) => {
    const teacherId = localStorage.getItem("teacherId");
    const courseFormData = new FormData();
    courseFormData.append("category", values.category);
    courseFormData.append("teacher", teacherId as any);
    courseFormData.append("title", values.title);
    courseFormData.append("description", values.description);
    {
      CourseData.featured_img &&
        courseFormData.append("featured_img", CourseData.featured_img);
    }
    courseFormData.append("techs", values.techs);
    courseFormData.append("price", values.price);

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}course/`,
        courseFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      if (response.status == 200 || response.status == 201) {
        setCourseData("");
        Swal.fire({
          title: "Data has been added",
          icon: "success",
          toast: true,
          timer: 5000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        console.log("Error:", error.response.data);
        const errorData = error.response.data;
        const errorMessages = [];

        if (errorData.category) {
          errorMessages.push(errorData.category[0]);
        }
        if (errorData.title) {
          errorMessages.push(errorData.title[0]);
        }
        if (errorData.featured_img) {
          errorMessages.push(errorData.featured_img[0]);
        }

        if (errorMessages.length > 0) {
          handleApiError(errorMessages);
        }
      } else {
        console.error("Error:", error);
      }
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
              Add Courses
            </h5>
            <form onSubmit={Formik.handleSubmit} className="container mt-2">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Category
                </label>
                <select
                  name="category"
                  className="form-control"
                  value={Formik.values.category}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
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
                {Formik.errors.category && Formik.touched.category ? (
                  <p className="text-sm text-red-600">
                    {Formik.errors.category as any}
                  </p>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Title
                </label>
                <input
                  value={Formik.values.title}
                  placeholder="Enter course title"
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {Formik.errors.title && Formik.touched.title ? (
                  <p className="text-sm text-red-600">
                    {Formik.errors.title as any}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    value={Formik.values.description}
                    onChange={Formik.handleChange}
                    placeholder="Leave a comment here"
                    onBlur={Formik.handleBlur}
                    name="description"
                    className="form-control"
                    id="floatingTextarea2"
                  ></textarea>
                  {Formik.errors.description && Formik.touched.description ? (
                    <p className="text-sm text-red-600">
                      {Formik.errors.description as any}
                    </p>
                  ) : null}
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
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Price
                </label>
                <input
                  value={Formik.values.price}
                  onChange={Formik.handleChange}
                  placeholder="Price"
                  onBlur={Formik.handleBlur}
                  name="price"
                  type="number"
                  className="form-control"
                />
                {Formik.errors.price && Formik.touched.price ? (
                  <p className="text-sm text-red-600">
                    {Formik.errors.price as any}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Technologies
                </label>
                <div className="form-floating">
                  <textarea
                    value={Formik.values.techs}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="techs"
                    className="form-control"
                    placeholder="Php,Python,Javascript,HTML,CSS,Javascript"
                    id="floatingTextarea2"
                  ></textarea>
                  {Formik.errors.techs && Formik.touched.techs ? (
                    <p className="text-sm text-red-600">
                      {Formik.errors.techs as any}
                    </p>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="btn btn-primary  w-100">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddCourse;
