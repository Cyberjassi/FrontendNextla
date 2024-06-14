import React from "react";
import Link from "next/link";
import logout from "@/app/(Auth)/logout/logout";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import {useFormik} from "formik"

function Header() {
  interface Search {
    'search': string;
  }
  
  const route = useRouter();
  const [searchString, setsearchString] = useState<Search>({
    "search":''
  });
  const teacherLoginStatus = localStorage.getItem("teacherLoginStatus");
  const studentLoginStatus = localStorage.getItem("studentLoginStatus");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setsearchString({
      ...searchString,
      [event.target.name]: event.target.value
    });
  };
  

  const searchCourse = () => {
    const searchRegex = /^[a-zA-Z\s]*$/; // Regex pattern to allow only alphabets and spaces
  
    // Check if search string is valid
    if (
      searchString.search.trim() !== '' && 
      searchRegex.test(searchString.search) &&
      !/^\d/.test(searchString.search)
    ) {
      route.push("/search/" + searchString.search);
      setsearchString({search:''})
    } else {
      alert("Please enter a valid search query.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container d-flex justify-content-between align-items-center">
      {/* Left side */}
      <div className="d-flex align-items-center">
        <Link className="navbar-brand me-4 navbar-brand" href="/">
          Educonnect Hotspot
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
      <ul className="navbar-nav ms-auto me-5"> 
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
                  
                  <button className="ml-5" onClick={()=>logout()}>Logout</button>
             
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </div>
  </nav>  );
}


export default Header;
