"use client"

import React from 'react';
import  Link from 'next/link';
import logout from '@/app/(Auth)/logout/logout';

function TeacherSidebar() {
  return (
    <div className="card shadow">
      <div className="list-group">
        <Link href="/teacher/dashboard" className="list-group-item list-group-item-action">
          Dashboard
        </Link>

        <Link href="/teacher/my-courses" className="list-group-item list-group-item-action">
          My Courses
        </Link>

        <Link href="/teacher/add-courses" className="list-group-item list-group-item-action">
          Add Courses
        </Link>

        <Link href="/teacher/my-users" className="list-group-item list-group-item-action">
          My Users
        </Link>

        <Link href="/teacher/profile-settings" className="list-group-item list-group-item-action">
          Profile Settings
        </Link>

        <Link href="/teacher/change-password" className="list-group-item list-group-item-action">
          Change Password
        </Link>

        <button className="list-group-item list-group-item-action text-danger" onClick={()=>logout()}>Logout</button>

      </div>
    </div>
  );
}

export default TeacherSidebar;
