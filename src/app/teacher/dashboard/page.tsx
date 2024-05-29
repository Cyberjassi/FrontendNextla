'use client'
import TeacherSidebar from "@/components/Teacher/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';

function TeacherDashboard() {
  const [dashboard, setDashboard] = useState<any>(null); // Initialize dashboard state to null
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    if (teacherId) { // Check if teacherId exists
      axios.get(`http://127.0.0.1:8000/api/teacher/dashboard/${teacherId}`)
        .then((res: any) => {
          console.log(res);
          setDashboard(res.data);
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
          // Handle error (e.g., show error message to user)
        });
    }
  }, [teacherId]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9">
          {dashboard ? ( // Render dashboard only if data is available
            <div className="row">
              <div className="col-md-4">
                <div className="card border-primary">
                  <h5 className="card-header bg-primary text-white">Total Courses</h5>
                  <div className="card-body">
                    <h3>
                      <Link href='/teacher/my-courses'>
                        {dashboard.total_teacher_courses}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-primary">
                  <h5 className="card-header bg-success text-white">Total Students</h5>
                  <div className="card-body">
                    <h3>
                      <Link href='/teacher/my-users'>
                        {dashboard.total_teacher_students}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-primary">
                  <h5 className="card-header bg-info text-white">Total Chapters</h5>
                  <div className="card-body">
                    <h3>
                      <Link href='/teacher/my-courses'>
                        {dashboard.total_teacher_chapters}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p> // Show loading state while data is being fetched
          )}
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
