import React from "react";
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";

function TeacherMyCourses() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>Php Development</td>
                  <td>
                    <Link href="/">123</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                    <Link className="btn btn-success btn-sm active ms-2" href="/add-chapter/2">Add Chapters</Link>
                  </td>
                </tbody>
              </table>
            </div>
          </div> 
        </section>
      </div>
    </div>
  );
}

export default TeacherMyCourses;
{
  /* <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>Php Development</td>
                  <td>
                    <Link href="/">Suraj Kumar</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div> */
}
