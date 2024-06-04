import React from "react";
import Link from "next/link";
import { useState,useEffect } from "react";

function Header() {
  interface Search {
    'search': string;
  }
  
  
  const [searchString, setsearchString] = useState<Search>({
    "search":''
  });
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setsearchString({
      // we pass referance CourseData and then change our name and value acording to event 
      ...searchString,
      [event.target.name]: event.target.value
    });
  };
  

  const searchCourse = () =>{
    if (searchString.search != ''){
    window.location.href = "/search/"+searchString.search;
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container d-flex justify-content-between align-items-center">
      {/* Left side */}
      <div className="d-flex align-items-center">
        <Link className="navbar-brand me-4" href="/">
          Working
        </Link>
        <form className="d-flex">
          <input
            name="search"
            onChange={handleChange}
            className="form-control me-2"
            type="search"
            placeholder="Search by Course Title"
            aria-label="Search"
          />
          <button onClick={searchCourse} className="btn btn-warning" type="button">
            Search
          </button>
        </form>
      </div>

      {/* Right side */}
      <ul className="navbar-nav ms-auto me-5"> {/* Increased margin to me-5 */}
        <li className="nav-item active">
          <Link className="nav-link" href="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/all-courses">
            Courses
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" href="/categories">
            Categories
          </Link>
        </li> */}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="teachersDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="teachersDropdown"
          >
            {!teacherLoginStatus && !studentLoginStatus && (
              <>
                <li>
                  <Link className="dropdown-item" href="/registration">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {(teacherLoginStatus || studentLoginStatus) && (
              <>
                {teacherLoginStatus && (
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/teacher/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {studentLoginStatus && (
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/student/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/logout">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  </nav>  );
}
{
  /* my logic */
}
{
  /* {teacherLoginStatus!=='true' &&
<li className="nav-item dropdown">
  <a
    className="nav-link dropdown-toggle"
    href="#"
    id="userDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    User
  </a>
  <ul className="dropdown-menu" aria-labelledby="userDropdown">
   
        <li>
          <Link className="dropdown-item" href="/user/registration">
            Register
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/user/login">
            Login
          </Link>
        </li>
   
    <li>
      <Link className="dropdown-item" href="/user/dashboard">
        Dashboard
      </Link>
    </li>
    <li>
      <hr className="dropdown-divider" />
    </li>
    <li>
      <a className="dropdown-item" href="/teacher/logout">
        Logout
      </a>
    </li>
  </ul>
</li>} */
}

export default Header;
