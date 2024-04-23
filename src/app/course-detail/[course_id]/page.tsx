'use client'
import React from 'react'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa';

function page({params}:any) {
  return (
      <div>
       
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            className="img-thumbnail"
            src="https://picsum.photos/200/300"
            alt="Card image cap"
          />
        </div>
        <div className="col-8">

          <h3>course Title</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur eaque veritatis in unde laudantium temporibus ut! Nam
            illum velit sequi ea quibusdam aperiam et perferendis, facilis
            voluptas? Quis iure necessitatibus inventore quod laboriosam
            veritatis labore nesciunt aliquid, dicta, cumque placeat obcaecati
            dolorem totam laborum eos.
          </p>
          <p className="fw-bold">
            Course By: <Link href="/teacher-detail/1">Teacher 1</Link>
          </p>
          <p className="fw-bold">Duration: 3 Hours 30 Minutes</p>
          <p className="fw-bold">Total Enrolled: 456 Students</p>
          <p className="fw-bold">Rating: 4.5/5 </p>
        </div>
      </div>
      {/* Course Videos */}
      <div className="card mt-4">
        <div className="card">
          <h3 className="card-header">Course Videos</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Introduction{" "}
              <span className="float-end">
                <span className="me-5">1 Hour 30 mins</span>
                <button
                  className="btn  btn-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#videoModal1"
                >
                  <FaYoutube size={20} />
                </button>
              </span>
              {/* Video Model Start */}
              <div
                className="modal fade"
                id="videoModal1"
                // tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Video 1
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          title="YouTube video"
                        //   allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Model End */}
            </li>
            <li className="list-group-item">
              Introduction{" "}
              <span className="float-end">
                <span className="me-5">1 Hour 30 mins</span>
                <button className="btn  btn-danger ">
                <FaYoutube size={20} />
                </button>
              </span>
            </li>
            <li className="list-group-item">
              Introduction{" "}
              <span className="float-end">
                <span className="me-5">1 Hour 30 mins</span>
                <button className="btn  btn-danger  ">
                <FaYoutube size={20} />
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* EndCourse Videos */}

      {/* Ratlated Course */}
      <h3 className="pb-1 my-4 text-start mt-5">
        Realted Courses
        <a href="#" className="float-end">
          See All
        </a>
      </h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link href="/detail/1">
              <img
                className="card-img-top"
                src="https://picsum.photos/200/300"
                alt="Card image cap"
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link href="/detail/1">Course Title</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                className="card-img-top"
                src="https://picsum.photos/200/300"
                alt="Card image cap"
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course Title</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                className="card-img-top"
                src="https://picsum.photos/200/300"
                alt="Card image cap"
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course Title</a>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                className="card-img-top"
                src="https://picsum.photos/200/300"
                alt="Card image cap"
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Course Title</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* Ratlated Course end*/}
    </div>
  </div>
  )
}

export default page
