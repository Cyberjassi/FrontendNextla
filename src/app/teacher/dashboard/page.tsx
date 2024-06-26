"use client";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import cookies from "js-cookie";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const teacherId = localStorage.getItem("teacherId");
  const token = cookies.get("token");
  useEffect(() => {
    if (teacherId) {
      axios
        .get(`${process.env.BASE_URL}teacher/dashboard/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          console.log(res);
          setDashboard(res.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [teacherId]);

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          {dashboard ? (
            <div className="row">
              <div className="col-md-4">
                <div className="card border-primary ccard">
                  <h5 className="card-header bg-primary text-white">
                    Total Courses
                  </h5>
                  <div className="card-body">
                    <h3>
                      <Link
                        className="custom-link-style color-primary"
                        href="/teacher/my-courses"
                      >
                        {dashboard.total_teacher_courses}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-primary ccard">
                  <h5 className="card-header bg-success text-white">
                    User's Enrolled
                  </h5>
                  <div className="card-body">
                    <h3>
                      <Link
                        className="custom-link-style color-primary"
                        href="/teacher/my-users"
                      >
                        {dashboard.total_teacher_students}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-primary ccard">
                  <h5 className="card-header bg-info text-white">
                    Total Chapters
                  </h5>
                  <div className="card-body">
                    <h3>
                      <Link
                        className="custom-link-style color-primary"
                        href="/teacher/my-courses"
                      >
                        {dashboard.total_teacher_chapters}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
