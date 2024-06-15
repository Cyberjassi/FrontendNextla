"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";
import MessageList from "./MessageList";
import cookies from "js-cookie";

function MyTeachers() {
  const [teacherData, setteacherData] = useState<any>([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    const token = cookies.get("token");
    try {
      axios
        .get(`${process.env.BASE_URL}fatch-my-teachers/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setteacherData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   msg ---
  const [msgData, setmsgData] = useState<any>({
    msg_text: "",
  });

  const [successMsg, setSuccessMsg] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSuccessMsg("");
    setmsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (teacher_id: any) => {
    const msgFormData = new FormData();
    msgFormData.append("msg_from", "student");
    axios
      .post(
        `${process.env.BASE_URL}send-message/${teacher_id}/${studentId}`,
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
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              My Teachers
            </h5>
            <div className="card-body shadow">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherData.map((row: any, index: any) => (
                    <tr key={index}>
                      <td>
                        <Link
                          className="link-none"
                          href={`/teacher-detail/${row.teacher.id}`}
                        >
                          {row.teacher.full_name}
                        </Link>
                      </td>
                      <td>
                          <img
                            src={
                              row.teacher.profile_img
                                ? row.teacher.profile_img
                                : "/img/default.png"
                            }
                            width="80"
                            className="rounded"
                            alt={row.teacher.full_name}
                          />
                        </td>
                      <td>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target={`#msgModel${index}`}
                          className="btn btn-sm btn-dark mb-2 ccard"
                          title="Send Message"
                        >
                          <i className="bi bi-chat-fill"></i>
                        </button>

                        <div
                          className="modal fade"
                          id={`msgModel${index}`}
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
                                    {row.teacher.full_name}
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
                                      <MessageList
                                        teacher_id={row.teacher.id}
                                        student_id={studentId}
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
                                          submitForm(row.teacher.id)
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

export default MyTeachers;
