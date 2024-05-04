import React from 'react'
import Link from 'next/link'

function Sidebar() {
  return (
    <div className="card">
            
            <div className="list-group list-group-flush">
            <Link
                href="/student/dashboard"
                className="list-group-item list-group-item-action"
              >
                Dashboard
              </Link>
              <Link
                href="/student/my-courses"
                className="list-group-item list-group-item-action"
              >
                My Courses
              </Link>
              <Link
                href="/student/favorite-courses"
                className="list-group-item list-group-item-action"
              >
                Favorite Courses
              </Link>
              <Link
                href="/student/recommended-courses"
                className="list-group-item list-group-item-action"
              >
                Recommended Courses
              </Link>
              <Link
                href="/student/profile-settings"
                className="list-group-item list-group-item-action"
              >
                Profile Settings
              </Link>
              <Link
                href="/student/change-password"
                className="list-group-item list-group-item-action"
              >
                Change Password
              </Link>
              <Link
                href="/student/logout"
                className="list-group-item list-group-item-action text-danger"
              >
                Logout
              </Link>
            </div>
          </div>
  )
}

export default Sidebar
