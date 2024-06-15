"use client";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function addAssignment(props: any) {
  const teacher_id: any = localStorage.getItem("teacherId");
  const student_id = props.params["student-id"];
  interface AssignmentData {
    title: string;
    detail: string;
  }
  const [assignmentData, setassignmentData] = useState<AssignmentData>({
    title: "",
    detail: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setassignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("jalksdfjlkasdjf");
    const chapterFormData = new FormData();
    chapterFormData.append("teacher", teacher_id);
    chapterFormData.append("title", assignmentData.title);
    chapterFormData.append("detail", assignmentData.detail);
    chapterFormData.append("student", student_id);
    axios
      .post(
        `${process.env.BASE_URL}student-assignment/${student_id}/${teacher_id}`,
        chapterFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setassignmentData({ title: "", detail: "" });
        console.log(response.data);
        if (response.status == 200 || response.status == 201) {
          Swal.fire({
            title: "Assignment has been added",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });

          //  notification -
          const notifData = new FormData();
          notifData.append("teacher", teacher_id);
          notifData.append("notif_subject", "assignment");
          notifData.append("notif_for", "student");
          notifData.append("student", student_id);
          axios
            .post(`${process.env.BASE_URL}save-notification/`, notifData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding data",
          icon: "error",
        });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-heade text-center bg-primary text-white">
              Add Assignment
            </h5>
            <form className="container" onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label ">
                  Title
                </label>
                <input
                  onChange={handleChange}
                  value={assignmentData.title}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="detail" className="form-label">
                  Detail
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    value={assignmentData.detail}
                    name="detail"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="detail"
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

export default addAssignment;
