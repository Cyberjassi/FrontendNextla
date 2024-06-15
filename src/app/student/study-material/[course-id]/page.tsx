"use client";
import { useEffect, useState } from "react";
import UserSidebar from "@/components/student/UserSidebar";
import Link from "next/link";
import axios from "axios";

function StudyMaterials(props: any) {
  const [studyData, setstudyData] = useState([]);
  const [totalResult, setTotalResult] = useState([0]);
  const currentCourse = props.params["course-id"];

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}study-materials/${currentCourse}`)
      .then((response) => {
        const data = response.data;
        setTotalResult(data.length);
        setstudyData(data);
      })
      .catch((error) => {
        console.error("Error fetching course chapters:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              All Study Materials ({totalResult})
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Detail</th>
                    <th>Material</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {!studyData ? (
                    <p>Loading....</p>
                  ) : (
                    studyData &&
                    studyData.map((row: any, index: any) => (
                      <tr key={index}>
                        <td>{row.title}</td>
                        <td>{row.description}</td>
                        <td>
                          <Link className="link-none" href={row.upload}>File</Link>
                        </td>
                        <td>
                          <Link className="link-none" href="#">{row.remarks}</Link>
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
