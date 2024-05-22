"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import MessageList from "@/components/Message/MessageList";

// import { getCourseInfo } from "@/app/redux/Course/CourseRetreieve";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Myusers(props: any) {
  // const currentCourse = props.params['course-id']

  const [studentData, setStudentData] = useState<any>([]);

  // to get teacher id from local storage---
  const teacher_id = localStorage.getItem("teacherId");

  useEffect(() => {
    try {
      axios
        .get(
          `http://127.0.0.1:8000/api/fatch-all-enrolled-students/${teacher_id}`
        )
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [msgData, setmsgData] = useState<any>({
    msg_text: "",
  });

  const [groupMsgData, setgroupMsgData] = useState<any>({
    msg_text: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setmsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (student_id: any) => {
    // e.preventDefault();
    const msgFormData = new FormData();

    msgFormData.append("teacher", teacher_id as any);
    msgFormData.append("student", student_id);
    msgFormData.append("msg_text", msgData.msg_text);
    msgFormData.append("msg_from", "teacher");

    // console.log("here course form data", [...msgFormData.entries()]);

    axios
      .post(
        `http://127.0.0.1:8000/api/send-message/${teacher_id}/${student_id}`,
        msgFormData
      )
      .then((response) => {
        if (response.data.bool == true) {
          setmsgData({
            msg_text: "",
          });
          setSuccessMsg(response.data.msg);
          setErrorMsg("");
        } else {
          setSuccessMsg("");
          setErrorMsg(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const msgList = {
    height: "500px",
    overflow: "atuo",
  };


  const groupFormSubmit = () => {
    // e.preventDefault();
    const msgFormData = new FormData();

    msgFormData.append("teacher", teacher_id as any);
    msgFormData.append("student", student_id);
    msgFormData.append("msg_text", msgData.msg_text);
    msgFormData.append("msg_from", "teacher");

    // console.log("here course form data", [...msgFormData.entries()]);

    axios
      .post(
        `http://127.0.0.1:8000/api/send-message/${teacher_id}/${student_id}`,
        msgFormData
      )
      .then((response) => {
        if (response.data.bool == true) {
          setmsgData({
            msg_text: "",
          });
          setSuccessMsg(response.data.msg);
          setErrorMsg("");
        } else {
          setSuccessMsg("");
          setErrorMsg(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
            <h5 className="card-header">
              All Student List
              <button
                type="button"
                className="btn btn-primary float-end btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#groupMsgModal"
              >
                Send Message
              </button>
            </h5>

            <div
              className="modal fade"
              id="groupMsgModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Send Message to All Students
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">

                    {groupsuccessMsg && <p className="text-success">{groupsuccessMsg}</p>}
                    {grouperrorMsg && <p className="text-danger">{grouperrorMsg}</p>}
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail"
                          className="form-label"
                        >
                          Message
                        </label>
                        <textarea
                          onChange={handleChange}
                          value={groupMsgData.msg_text}
                          name="msg_text"
                          className="form-control"
                          rows={10}
                        ></textarea>
                      </div>
                      <button
                        onClick={() => groupFormSubmit}
                        type="button"
                        className="btn btn-primary"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

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
                          href={`assignments/${teacher_id}/${row.student.id}`}
                          className="btn btn-sm btn-warning mb-2 me-2"
                        >
                          Assignments
                        </Link>
                        <Link
                          href={`add-assignment/${teacher_id}/${row.student.id}`}
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
                                  <span
                                    className="ms-5 btn btn-sm btn-danger"
                                    title="Messages"
                                  >
                                    <i className="bi bi-chat-dots"></i>
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
                                      <MessageList
                                        teacher_id={teacher_id}
                                        student_id={row.student.id}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3 col-12">
                                    {successMsg && (
                                      <p className="text-success">
                                        {successMsg}
                                      </p>
                                    )}
                                    {errorMsg && (
                                      <p className="text-danger">{errorMsg}</p>
                                    )}
                                    <form>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="exampleInputEmail"
                                          className="form-label"
                                        >
                                          Message
                                        </label>
                                        <textarea
                                          onChange={handleChange}
                                          value={msgData.msg_text}
                                          name="msg_text"
                                          className="form-control"
                                          rows={10}
                                        ></textarea>
                                      </div>
                                      <button
                                        onClick={() =>
                                          submitForm(row.student.id)
                                        }
                                        type="button"
                                        className="btn btn-primary"
                                      >
                                        Send
                                      </button>
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

// <div className="row">
// {/* from another users */}
// <div className="col-5">
//   <div className="alert alert-primary mb-1">
//    A simple primary alert
//   </div>
//    <small className="text-muted">time</small>
// </div>
// </div>
// <div className="row">
// {/* My messages */}
// <div className="col-4 offset-7">
//   <div className="alert alert-success mb-1">
//   <MessageList teacher_id={teacher_id} student_id={row.student.id}/>
//   </div>
//     <small className="text-muted">time</small>
// </div>
// </div>
