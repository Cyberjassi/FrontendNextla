"use client";
import React, { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Link from "next/link";

// for sweetalert---

import axios from "axios";

function ShowAssignment(props: any) {
  const [assignmentData, setassignmentData] = useState([]);
  const [totalResult, setTotalResult] = useState([0]);
  const teacher_id = localStorage.getItem('teacherId')
  const student_id = props.params["student-id"];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}student-assignment/${student_id}/${teacher_id}`)
      .then((response) => {
        const data = response.data;
        setTotalResult(data.length)
        setassignmentData(data);
      })
      .catch((error) => {
        console.error("Error fetching course chapters:", error);
      });
  }, []);
  // console.log("this is my chapters", chapterData);

  // for sweetalert---
  // const Swal = require('sweetalert2')
  // const handleDeleteClick = (chapter_id: any) => {
  //   console.log("..................", chapter_id);

  //   Swal.fire({
  //     title: "Confirm",
  //     text: "Are you sure you want to delete this data?",
  //     icon: "info",
  //     showCancelButton: true,
  //     confirmButtonText: "Continue",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         axios
  //           .delete(`http://localhost:8000/api/chapter/${chapter_id}`)
  //           .then((res) => {
  //             console.log(res);
  //             Swal.fire('success','Data has been deleted. ')
  //             axios
  //               .get(
  //                 `http://localhost:8000/api/course-chapters/${currentChapter}`
  //               )
  //               .then((response) => {
  //                 const data = response.data;
  //                 setTotalResult(data.length);
  //                 setChapterData(data);
  //               })
  //               .catch((error) => {
  //                 console.error("Error fetching course chapters:", error);
  //               });
  //           })
  //           .catch((error) => {
  //             Swal.fire("error", "Data has not been deleted!!", "error");
  //           });
      
  //       } catch (error) {
  //         Swal.fire("error", "Data has not been deleted!!", "error");
  //       }
  //     } else {
  //       Swal.fire("error", "Data has not been deleted!!");
  //     }
  //   });
  // };
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Assignment ({totalResult}) <Link href={`/teacher/add-assignment/${teacher_id}/${student_id}`} className="btn btn-sm btn-success float">Add Assignment</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {!assignmentData ? (
                    <p>Loading....</p>
                  ) : (
                    assignmentData &&
                    assignmentData.map((chapter: any, index: any) => (
                      <tr key={index}>
                        <td>
                          {chapter.title}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ShowAssignment;
