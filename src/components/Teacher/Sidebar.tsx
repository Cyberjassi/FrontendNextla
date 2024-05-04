"use client"

import Link from 'next/link';


function TeacherSidebar() {
  return (
    <div className="card">
            
            <div className="list-group list-group-flush">
            <Link
                href="/teacher/dashboard"
                className="list-group-item list-group-item-action"
              >
                Dashboard
              </Link>

            <Link
                href="/teacher/my-courses"
                className="list-group-item list-group-item-action"
              >
                My Courses
              </Link>
            <Link
                href="/teacher/add-courses"
                className="list-group-item list-group-item-action"
              >
                Add Courses
              </Link>
            <Link
                href="/teacher/my-users"
                className="list-group-item list-group-item-action"
              >
                My Users
              </Link>
             
        
              <Link
                href="/teacher/profile-settings"
                className="list-group-item list-group-item-action"
              >
                Profile Settings
              </Link>
              <Link
                href="/teacher/change-password"
                className="list-group-item list-group-item-action"
              >
                Change Password
              </Link>
              <Link
                href="/teacher/logout"
                className="list-group-item list-group-item-action text-danger"
              >
                Logout
              </Link>
             
            </div>
          </div>
  )
}

export default TeacherSidebar
