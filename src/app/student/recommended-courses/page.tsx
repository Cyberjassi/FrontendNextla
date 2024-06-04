"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserSidebar from "@/components/student/UserSidebar";
import axios from "axios";

function RecommendedCourses() {
  const [courseData, setCourseData] = useState<any>([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}fatch-recommended-courses/?studentId=${studentId}`
      );
      setCourseData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    fetchData();
  }, [studentId]);

  console.log("this is recommended course data", courseData);

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar />
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header">Recommended Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData &&
                    courseData.map((row: any, index: any) => (
                      <tr key={index}>
                        <td>
                          <Link
                            className="link-none"
                            href={`/course-detail/${row.id}`}
                          >
                            {row.title}
                          </Link>
                        </td>
                        <td>{row.techs}</td>
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

export default RecommendedCourses;
