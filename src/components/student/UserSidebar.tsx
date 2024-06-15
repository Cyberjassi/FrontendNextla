import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import "./usersidebar.module.css";
import logout from "@/app/(Auth)/logout/logout";

function Sidebar() {
  const [notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem("studentId");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    try {
      axios
        .get(
          `${process.env.BASE_URL}student/fetch-all-notification/${studentId}`
        )
        .then((res) => {
          setnotifData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const [currentPath, setCurrentPath] = useState("");

  return (
    <div className="card shadow">
      <div className="list-group">
        <Link
          href="/student/dashboard"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/student/my-courses"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/my-courses" ? "active" : ""
          }`}
        >
          My Courses
        </Link>
        <Link
          href="/student/my-teachers"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/my-teachers" ? "active" : ""
          }`}
        >
          My Teachers
        </Link>
        <Link
          href="/student/favorite-courses"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/favorite-courses" ? "active" : ""
          }`}
        >
          Favorite Courses
        </Link>
        <Link
          href="/student/recommended-courses"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/recommended-courses" ? "active" : ""
          }`}
        >
          Recommended Courses
        </Link>
        <Link
          href="/student/assignments"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/assignments" ? "active" : ""
          }`}
        >
          Assignment
          {notifData.length !== 0 && (
            <span className="float-end badge bg-danger mt-1">
              {notifData.length}
            </span>
          )}
        </Link>
        <Link
          href="/student/profile-settings"
          className={`list-group-item list-group-item-action ${
            currentPath === "/student/profile-settings" ? "active" : ""
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

export default Sidebar;
