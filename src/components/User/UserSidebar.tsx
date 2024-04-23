import React from 'react'
import Link from 'next/link'

function Sidebar() {
  return (
    <div className="card">
            
            <div className="list-group list-group-flush">
            <Link
                href="/user/dashboard"
                className="list-group-item list-group-item-action"
              >
                Dashboard
              </Link>
              <Link
                href="/user/my-courses"
                className="list-group-item list-group-item-action"
              >
                My Courses
              </Link>
              <Link
                href="/user/favorite-courses"
                className="list-group-item list-group-item-action"
              >
                Favorite Courses
              </Link>
              <Link
                href="/user/recommended-courses"
                className="list-group-item list-group-item-action"
              >
                Recommended Courses
              </Link>
              <Link
                href="/user/profile-settings"
                className="list-group-item list-group-item-action"
              >
                Profile Settings
              </Link>
              <Link
                href="/user/change-password"
                className="list-group-item list-group-item-action"
              >
                Change Password
              </Link>
              <Link
                href="/user/login"
                className="list-group-item list-group-item-action text-danger"
              >
                Logout
              </Link>
            </div>
          </div>
  )
}

export default Sidebar
