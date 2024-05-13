"use client";
import React, { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Link from "next/link";

// for sweetalert---
import Swal from "sweetalert2";
import axios from "axios";

function StudyMaterials(props: any) {
  const [studyData, setstudyData] = useState([]);
  // count all chapters-
  const [totalResult, setTotalResult] = useState([0]);
  const currentCourse = props.params["course-id"];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/study-materials/${currentCourse}`)
      .then((response) => {
        const data = response.data;
        setTotalResult(data.length);
        setstudyData(data);
      })
      .catch((error) => {
        console.error("Error fetching course chapters:", error);
      });
  }, []);
  // console.log("this is my chapters", studyData);

  // for sweetalert---
  // const Swal = require('sweetalert2')
  const handleDeleteClick = (study_id: any) => {
    console.log("..................", study_id);

    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this data?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`http://localhost:8000/api/study-material/${study_id}`)
            .then((res) => {
              console.log(res);
              Swal.fire('success','Data has been deleted. ')
              axios
              .get(`http://localhost:8000/api/study-materials/${currentCourse}`)
                .then((response) => {
                  const data = response.data;                                   
                  setTotalResult(data.length);
                  setstudyData(data);
                })
                .catch((error) => {
                  console.error("Error fetching course chapters:", error);
                });
            })
            .catch((error) => {
              Swal.fire("error", "Data has not been deleted!!", "error");
            });
      
        } catch (error) {
          Swal.fire("error", "Data has not been deleted!!", "error");
        }
      } else {
        Swal.fire("error", "Data has not been deleted!!");
      }
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
            <h5 className="card-header">All Study Materials ({totalResult}) <Link href={`/teacher/add-study-material/${currentCourse}`} className="btn btn-sm btn-success float">Add Study Material</Link></h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Upload</th>
                    <th>Remarks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!studyData ? (
                    <p>Loading....</p>
                  ) : (
                    studyData &&
                    studyData.map((row: any, index: any) => (
                      <tr key={index}>
                        <td>
                          <Link href="/edit-study/">{row.title}</Link>
                        </td>
                        <td>
                          <Link href={row.upload}>File</Link>
                        </td>
                        <td>
                          <Link href="#">{row.remarks}</Link>
                        </td>
                        <td> 
                          <button
                            onClick={() => handleDeleteClick(row.id)}
                            className="btn btn-danger btn-sm  ms-2"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
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

export default StudyMaterials;
