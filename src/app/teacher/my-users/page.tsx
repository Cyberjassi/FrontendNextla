"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import MessageList from "./MessageList";

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
          `${process.env.BASE_URL}fatch-all-enrolled-students/${teacher_id}`
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

    // msgFormData.append("teacher", teacher_id as any);
    // msgFormData.append("student", student_id);
    msgFormData.append("msg_text", msgData.msg_text);
    msgFormData.append("msg_from", "teacher");

    // console.log("here course form data", [...msgFormData.entries()]);

    axios
      .post(
        `${process.env.BASE_URL}send-message/${teacher_id}/${student_id}`,
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

// Group Messages--
  const [groupMsgData, setgroupMsgData] = useState<any>({
    msg_text: "",
  });

  const [groupsuccessMsg, setgroupsuccessMsg] = useState("");
  const [grouperrorMsg, setgrouperrorMsg] = useState("");


  const grouphandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setgroupMsgData({
      ...groupMsgData,
      [event.target.name]: event.target.value,
    });
  };

  const groupFormSubmit = async () => {
    // e.preventDefault();
    const msgFormData = new FormData();

    msgFormData.append("msg_text", groupMsgData.msg_text);
    msgFormData.append("msg_from", "teacher");

    // console.log("here course form data", [...msgFormData.entries()]);
try{
   const response:any = await axios.post(
        `${process.env.BASE_URL}send-group-message/${teacher_id}`,
        msgFormData
      )
        if (response.data.bool == true) {
          setgroupMsgData({
            msg_text: "",
          });
          setgroupsuccessMsg(response.data.msg);
          setgrouperrorMsg("");
        } else {
          setgroupsuccessMsg("");
          // setgrouperrorMsg(response.data.msg);
        }
      }catch(error){
        console.error("Error:", error);
      }
  };

 console.log("this is group message",groupMsgData)
  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header">
              All Student List
              <button
                type="button"
                className="btn btn-primary float-end btn-sm ccard"
                data-bs-toggle="modal"
                data-bs-target="#groupMsgModal"
              >
                Send Message
              </button>
            </h5>

            <div
              className="modal fade"
              id="groupMsgModal"
              // tabIndex="-1"
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
                          onChange={grouphandleChange}
                          value={groupMsgData.msg_text}
                          name="msg_text"
                          className="form-control"
                          rows={10}
                        ></textarea>
                      </div>
                      <button
                        onClick={groupFormSubmit}
                        type="button"
                        className="btn btn-primary ccard"
                      >
                        Send
                      </button>
                    </form>
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
                          className="btn btn-sm btn-warning mb-2 me-2 ccard"
                        >
                          Assignments
                        </Link>
                        <Link
                          href={`add-assignment/${teacher_id}/${row.student.id}`}
                          className="btn btn-sm btn-success mb-2 me-2 ccard"
                        >
                          Add Assignment
                        </Link>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#msgModel${index}`}
                          className="btn btn-sm btn-dark mb-2"
                          title="Send Message"
                        >
                          <i className="bi bi-chat-fill ccard"></i>
                        </button>

                        <div
                          className="modal fade"
                          id={`msgModel${index}`}
                          // tabindex="-1"
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
