import React from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";


function TeacherMyCourses() {
 
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Courses</h5>
            <form className="container">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Category
                </label>
                <select name="category" 
                className="form-control">
                   
                    <option>
                       
                    </option>
               
                </select>
                </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Title
                </label>
                <input
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
             
                  name="featured_img"
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >
                  Technologies
                </label>
                <div className="form-floating">
                  <textarea
                 
                    name="techs"
                    className="form-control"
                    placeholder="Php,Python,Javascript,HTML,CSS,Javascript"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherMyCourses;
