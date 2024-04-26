"use client";
import React from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryInfo } from "@/app/redux/Category/CategoryRetriew";
import axios from "axios";

function AddCourse() {

  // for category Retriew ---
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryInfo());
  }, [dispatch]);
  const state = useSelector((state: any) => state);
  console.log("this is my State", state);
  let dataCategory = state.category.data
 


  // for post data for course--
  interface CourseData {
    'category': any;
    'teacher': any|Number;
    'title': string;
    'description': string;
    'featured_img': File |string|any;
    'techs': string;
  
  }


  const [CourseData, setCourseData] = useState<CourseData>({
    'category': "",
    'teacher': "",
    'title': "",
    'description': "",
    'featured_img': "",
    'techs': "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setCourseData({
      // we pass referance CourseData and then change our name and value acording to event 
      ...CourseData,
      [event.target.name]: event.target.value
    });
  };
  
 console.log(CourseData)

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const courseFormData = new FormData();
    // Object.entries(CourseData).forEach(([key, value]) => {
    //   courseFormData.append(key, value as string | Blob);
    // });
    courseFormData.append('category',CourseData.category);
    courseFormData.append('teacher',1);
    courseFormData.append('title',CourseData.title);
    courseFormData.append('description',CourseData.description);
    courseFormData.append('featured_img',CourseData.featured_img,courseFormData.featured_img.name);
    courseFormData.append('techs',CourseData.techs);
  
  try{
    
    axios.post("http://127.0.0.1:8000/api/course/", courseFormData)
      .then((response) => {
        console.log(response.data);
        setCourseData(
          {
            'category': "",
            'teacher': "",
            'title': "",
            'description': "",
            'featured_img': "",
            'techs': "",
          }
        )
      })   
    }catch(error){
      console.log(error);
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
            <h5 className="card-header">Add Courses</h5>
            <form onSubmit={submitForm} className="container">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Category
                </label>
                <select name="category" className="form-control">
                  {/* if apit take time to load then show loading otherwise show data */}
                  {state.category.isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    dataCategory &&
                    dataCategory.map((category: any, index: any) => (
                      <option key={index}>{category.title}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Title
                </label>
                <input
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
                  onChange={handleChange}
                  name="featured_img"
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Technologies
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    name="techs"
                    className="form-control"
                    placeholder="Php,Python,Javascript,HTML,CSS,Javascript"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
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
