import React from "react";
import Link from "next/link";

function Header() {
  
const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Working
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="teachersDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Teachers
              </a>
              <ul className="dropdown-menu" aria-labelledby="teachersDropdown">
               
                <li> 
                  {teacherLoginStatus!=='true' &&
                <>
                    
                <li>
                  <Link className="dropdown-item" href="/teacher/registration">
                    Register
                  </Link>
                </li>
                  <Link className="dropdown-item" href="/teacher/login">
                    Login
                  </Link>
                  </>}
                </li>
                
                
                <li>
                  <Link className="dropdown-item" href="/teacher/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="/teacher/logout">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
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
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
