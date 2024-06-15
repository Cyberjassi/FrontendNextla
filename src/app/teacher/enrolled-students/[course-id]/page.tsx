"use client";
import React from "react";
import { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import axios from "axios";

function enrolledStudents(props: any) {
  const currentCourse = props.params["course-id"];
  const [studentData, setStudentData] = useState<any>([]);
  useEffect(() => {
    try {
      axios
        .get(`${process.env.BASE_URL}fatch-enrolled-students/${currentCourse}`)
        .then((res) => {
          setStudentData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9 shadow">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              Enrolled Student List
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Profile</th>
                    <th>Email</th>
                    <th>Total Enrolled</th>
                    <th>Intrested Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((row: any, index: any) => (
                    <tr>
                      <td>{row.student.full_name}</td>
                      <td>
                        <img
                          src={
                            row.student.profile_img
                              ? row.student.profile_img
                              : "/img/default.png"
                          }
                          width="80"
                          className="rounded"
                          alt={row.student.full_name}
                        />
                      </td>
                      <td>{row.student.email}</td>
                      <td>{row.student.username}</td>
                      <td>{row.student.interested_categories}</td>
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

export default enrolledStudents;
