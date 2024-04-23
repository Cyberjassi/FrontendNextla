import React from "react";
import Link from "next/link";

import TeacherSidebar from "@/components/Teacher/Sidebar";

function TeacherProfileSettings() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
              <div className="mb-3 row">
                <label
                //  for="staticEmail"
                  className="col-sm-2 col-form-label">
                  Full Name
                </label>
                <div className="col-sm-10">
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="staticEmail"
                 className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="staticEmail"
                 className="col-sm-2 col-form-label">
                  Profile Photo
                </label>
                <div className="col-sm-10">
                  <div className="col-sm-10">
                    <input
                      type="file"
                      className="form-control"
                      id="inputPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="inputPassword"
                 className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label 
                // for="inputPassword" 
                className="col-sm-2 col-form-label">
                  Skills
                </label>
                <div className="col-sm-10">
                  <textarea
                    className="form-control"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <hr />
              <button className="btn btn-primary">Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherProfileSettings;
<div className="form-floating">
  <textarea
    className="form-control"
    placeholder="Leave a comment here"
    id="floatingTextarea2"
  ></textarea>
</div>;
