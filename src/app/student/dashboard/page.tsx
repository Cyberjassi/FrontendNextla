"use client";
import UserSidebar from "@/components/student/UserSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import cookies from "js-cookie";

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState<any>([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const token = cookies.get("token");
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}student/dashboard/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setDashboard(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  console.log("this is data from dashboard", dashboard);
  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
          <div className="row">
            <div className="col-md-4 ccard">
              <div className="card border-primary">
                <h5 className="card-header bg-primary text-white">
                  Enrolled Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link
                      className="custom-link-style color-primary"
                      href="/student/my-courses"
                    >
                      {dashboard && dashboard.enrolled_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 ccard">
              <div className="card border-primary">
                <h5 className="card-header bg-success text-white">
                  Favorite Courses
                </h5>
                <div className="card-body">
                  <h3>
                    <Link
                      className="custom-link-style color-primary"
                      href="/student/favorite-courses"
                    >
                      {dashboard && dashboard.favorite_courses}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 ccard">
              <div className="card border-primary">
                <h5 className="card-header bg-info text-white">
                  Complete Assignments
                </h5>
                <div className="card-body">
                  <h3>
                    <Link
                      className="custom-link-style color-primary"
                      href="/student/assignments"
                    >
                      {dashboard && dashboard.complete_assignments}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-2 ccard">
              <div className="card border-primary">
                <h5 className="card-header bg-danger text-white">
                  Pending Assignments
                </h5>
                <div className="card-body">
                  <h3>
                    <Link
                      className="custom-link-style color-primary"
                      href="/student/assignments"
                    >
                      {dashboard && dashboard.pending_assignments}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
