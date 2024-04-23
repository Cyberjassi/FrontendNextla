'use client'
import React from 'react'
// import Button from '@material-ui/core/Button'
import Header from './Header'
import Footer from './Footer'
import Card from '../Card/card'
// import Card from '../Card/card'


// component card future import 
import Link from 'next/link'

function Main() {
  return (
    <div>
      {/* <Header></Header> */}
      <>
      <div className="container mt-4">
        {/* <AllCourses></AllCourses> */}
        {/* LetstCourse */}
        <h3 className="pb-1 my-4 text-start">
          Latest Courses
          <Link href="/all-courses" className="float-end">
            See All
          </Link>
        </h3>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card">
              <Link href="/course-detail/1">
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
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
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
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
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
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
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
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End LetstCourse */}

        {/* Popular Courses */}
        <h3 className="pb-1 mb-5 mt-5 text-start">Popular Courses <Link href="/popular-courses" className="float-end">See All</Link></h3>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Popular Courses */}

        {/* Popular Teachers */}
        <h3 className="pb-1 my-4 mt-4 text-start">Popular Teachers<Link href="/popular-teachers" className="float-end">See All</Link></h3>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">TeacherName</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">TeacherName</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">TeacherName</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300?grayscale"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Teacher Name</a>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Popular Teachers */}

        {/*Student Testimonial */}
        <h3 className="pb-1 my-4 mt-4">Student Testimonial</h3>
        {/* <div
          id="carouselExampleIndicators"
          className="carousel slide bg-dark text-white py-5"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-href="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-href="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-href="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </figcaption>
              </figure>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
        {/* End Student Testimonial */}
      </div>
    </>
      {/* <Footer></Footer> */}
      
    </div>
  )
}

{/* <Button color="secondary">Secondary</Button>
<Button variant="contained" style={{backgroundColor:"green",color:"white"}}>
Success
</Button>
<Button variant="outlined" style={{backgroundColor:"red",color:"white"}}>
Error
</Button> */}
export default Main
