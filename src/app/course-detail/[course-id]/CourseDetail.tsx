"use client";

import Link from "next/link";
import Rating from "@/components/Home/Rating";


interface CourseDetailProps{
 course:any,
 teacher:any,
 techListData:any,
 enrollStatus:any,
 userLoginStatus:any,
 ratingStatus:any,
 favoriteStatus:any,
 razorpayPayment:any,
 submitForm:any,
 handleChange:any,
 ratingData:any,
 marksAsFavorite:any,
 removeFavorite:any,

}

const CourseDetail:React.FC<CourseDetailProps> = ({removeFavorite,marksAsFavorite,ratingData,handleChange,submitForm,course,teacher,techListData,enrollStatus,userLoginStatus,ratingStatus,favoriteStatus,razorpayPayment})=>{
    return(
        <>
         <div className="row">
          <div className="col-4">
            <img
              className="img-thumbnail card"
              src={
                course.featured_img ? course.featured_img : "/img/default.png"
              }
              alt="image "
            />
          </div>
          <div className="col-8">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p className="fw-bold">
              Course By:
              <Link
                className="custom-link-style"
                href={`/teacher-detail/${teacher.id}`}
              >
                {teacher.full_name}
              </Link>
            </p>
            <p className="fw-bold">
              Techs:&nbsp;
              {techListData &&
                techListData.map((tech: any, index: any) => (
                  <Link
                    key={index}
                    href={`/category/${tech.trim()}`}
                    className="badge badge-pill text-dark bg-warning custom-link-style ml-1 card ccard"
                  >
                    {tech}
                  </Link>
                ))}
            </p>
            <p className="fw-bold">
              Total Enrolled: {course.total_enrolled_students} Students
            </p>
            <p className="fw-bold">
              {course.course_rating == null && (
                <span>
                  Rating: <Rating rating={0} />
                </span>
              )}
              {course.course_rating && (
                <span>
                  Rating: <Rating rating={course.course_rating} />
                </span>
              )}
              {enrollStatus === "success" && userLoginStatus === "success" && (
                <>
                  {ratingStatus != "success" && (
                    <button
                      className="btn btn-success btn-sm ms-2 mt-2"
                      data-bs-toggle="modal"
                      data-bs-target="#ratingModal"
                    >
                      Rating
                    </button>
                  )}
                  {ratingStatus == "success" && (
                    <small className="badge bg-info text-dark ms-2">
                      You already rated this course
                    </small>
                  )}
                  <div
                    className="modal fade"
                    id="ratingModal"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Rate for course {course.title}
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                          </button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={submitForm as any}>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Rating</label>
                              <select
                                onChange={handleChange as any}
                                className="form-control"
                                name="rating"
                                value={ratingData.rating}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">
                                Review
                              </label>
                              <textarea
                                value={ratingData.reviews}
                                onChange={handleChange as any}
                                rows={10}
                                name="reviews"
                                className="form-control"
                              ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </p>
            {userLoginStatus == "success" && enrollStatus !== "success" && (
              <div>
                <p className="fw-bold mb-0">Price: ₹{course.price}</p>
                <button
                  onClick={() => razorpayPayment(course.price)}
                  className="btn btn-primary mt-2"
                >
                  Buy Now <i className="bi bi-cart"></i>
                </button>
              </div>
            )}

            {enrollStatus == "success" && userLoginStatus == "success" && (
              <p>
                <span>You are already enrolled in this course</span>
              </p>
            )}
            {userLoginStatus == "success" && favoriteStatus !== "success" && (
              <p>
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={marksAsFavorite}
                  title="Add in Your Favorite Course List"
                  type="button"
                >
                  <i className="bi bi-heart"></i>
                </button>
              </p>
            )}
            {userLoginStatus == "success" && favoriteStatus == "success" && (
              <p>
                <button
                  className="btn btn-outline-danger mt-2"
                  onClick={removeFavorite}
                  title="Remove from your Your favorite Course List"
                  type="button"
                >
                  <i className="bi bi-heart-fill"></i>
                </button>
              </p>
            )}
            {userLoginStatus !== "success" && (
              <p>
                <Link className="btn btn-success" href="/login">
                  Login as student to enroll
                </Link>
              </p>
            )}
          </div>
        </div>
        </>
    )
}

export default CourseDetail