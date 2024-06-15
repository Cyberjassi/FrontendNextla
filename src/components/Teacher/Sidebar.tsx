"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import logout from "@/app/(Auth)/logout/logout";

function TeacherSidebar() {
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="card shadow">
      <div className="list-group">
        <Link
          href="/teacher/dashboard"
          className={`list-group-item list-group-item-action ${
            currentPath === "/teacher/dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/teacher/my-courses"
          className={`list-group-item list-group-item-action ${
            currentPath === "/teacher/my-courses" ? "active" : ""
          }`}
        >
          My Courses
        </Link>

        <Link
          href="/teacher/add-courses"
          className={`list-group-item list-group-item-action ${
            currentPath === "/teacher/add-courses" ? "active" : ""
          }`}
        >
          Add Courses
        </Link>

        <Link
          href="/teacher/my-users"
          className={`list-group-item list-group-item-action ${
            currentPath === "/teacher/my-users" ? "active" : ""
          }`}
        >
          My Students
        </Link>

        <Link
          href="/teacher/profile-settings"
          className={`list-group-item list-group-item-action ${
            currentPath === "/teacher/profile-settings" ? "active" : ""
          }`}
        >
          Profile Settings
        </Link>

        <button
          className="list-group-item list-group-item-action text-danger"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TeacherSidebar;
