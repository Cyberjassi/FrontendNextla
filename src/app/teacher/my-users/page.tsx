"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";

// import { getCourseInfo } from "@/app/redux/Course/CourseRetreieve";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Myusers(props: any) {
  // const currentCourse = props.params['course-id']
  const [studentData, setStudentData] = useState<any>([]);

  // to get teacher id from local storage---
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios
        .get(
          `http://127.0.0.1:8000/api/fatch-all-enrolled-students/${teacherId}`
        )
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const msgList = {
    height: "500px",
    overflow: "atuo",
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Student List</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Intrested Categories</th>
                    <th>Assignment</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row: any, index: any) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>
                        {/* <Link className="btn btn-info btn-sm" href={`/view-student/${row.student.id}`}>View</Link> */}
                        {row.student.interested_categories}
                      </td>
                      <td className="text-center">
                        <Link
                          href={`assignments/${teacherId}/${row.student.id}`}
                          className="btn btn-sm btn-warning mb-2 me-2"
                        >
                          Assignments
                        </Link>
                        <Link
                          href={`add-assignment/${teacherId}/${row.student.id}`}
                          className="btn btn-sm btn-success mb-2 me-2"
                        >
                          Add Assignment
                        </Link>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#msgModel${index}`}
                          className="btn btn-sm btn-dark mb-2"
                          title="Send Message"
                        >
                          <i className="bi bi-chat-fill"></i>
                        </button>

                        <div
                          className="modal fade"
                          id={`msgModel${index}`}
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog  modal-fullscreen">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  
                                  <span className="text-danger">
                                    {row.student.full_name}
                                  </span>
                                  <span className="ms-5 btn btn-sm btn-secondary" title="Refresh">
                                    <i className="bi bi-bootstrap-reboot"></i>
                                  </span>
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="row">
                                  <div
                                    className="col-md-8 mb-2 col-12 border-end"
                                    style={msgList}
                                  >
                                    <div className="row">
                                      {/* from another users */}
                                      <div className="col-5">
                                        <div className="alert alert-primary mb-1">
                                         A simple primary alert
                                        </div>
                                         <small className="text-muted">time</small>
                                      </div>
                                    </div>
                                    <div className="row">
                                      {/* My messages */}
                                      <div className="col-4 offset-7">
                                        <div className="alert alert-success mb-1">
                                          A simple primary alert
                                        </div>
                                          <small className="text-muted">time</small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-12">
                                  <form>
                                      <div className="mb-3">
                                        <label htmlFor="exampleInputEmail" className="form-label">Message</label>
                                        <textarea className="form-control" rows={10}></textarea>
                                      </div>
                                      <button type="submit" className="btn btn-primary">Send</button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                    
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Myusers;
{
  /* <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>Php Development</td>
                  <td>
                    <Link href="/">Suraj Kumar</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div> */
}
