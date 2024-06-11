"use client";
import React from "react";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import useRazorpay from "react-razorpay";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Rating from "@/components/Home/Rating";

function page(props: any) {
  const route = useRouter()
  const currentCourse = props.params["course-id"];
  const studentId = localStorage.getItem("studentId");

  const imageUrl = "https://res.cloudinary.com/dr9wiqs2y/image/upload/v1/";

  // const siteUrl = "http://127.0.0.1:8000/";
  // console.log("this is param is",currentCourse)
  const [course, setCourse] = useState<any | String[]>([]);
  const [teacher, setTeacher] = useState<any | String[]>([]);
  const [chapterData, setChapterData] = useState<any | String[]>([]);
  const [realtedCourseData, setrealtedCourseData] = useState<any | String[]>(
    []
  );
  const [techListData, setTechListData] = useState<any | String[]>([]);
  const [userLoginStatus, setUserLoginStatus] = useState("");
  const [enrollStatus, setEnrollStatus] = useState("");
  const [ratingStatus, setratingStatus] = useState("");
  // const [courseView, setcourseViews] = useState(0);
  const [Avgrating, setAvgrating] = useState(0);
  const [favoriteStatus, setfavoriteStatus] = useState<any>();

  // payment-
  const [amount, setAmount] = useState(500);
  const Razorpay = useRazorpay();

  const complete_order = (paymentID: any, orderID: any, signature: any) => {
    axios({
      method: "post",
      url: `${process.env.BASE_URL}order/complete/`,
      data: {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount: amount,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const razorpayPayment = (price: any) => {
    axios
      .post(`${process.env.BASE_URL}order/create/`, {
        amount: price,
        currency: "INR",
      })
      .then((response) => {
        console.log("this is a response for razorpay", response.data.data);
        const order_id = response.data.data.id;

        const options = {
          key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response: any) {
            console.log("haksjdfkljaskdlfjklasjdfkljasdf");
            enrollCourse();
            //complete order
            complete_order(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "jaswant khatri",
            email: "jaswantkhatri30@gmail.com",
            contact: "9302211341",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          // alert(response.error.code);
          alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          // alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //end payment

  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}course/${currentCourse}`)
      .then((response) => {
        console.log("Data:", response.data);
        setCourse(response.data);
        setTeacher(response.data.teacher);
        setChapterData(response.data.course_chapter);
        // to parse the related videos json format
        setrealtedCourseData(JSON.parse(response.data.related_videos));
        setTechListData(response.data.tech_list);
        if (
          response.data.course_rating != "" &&
          response.data.course_rating != null
        ) {
          setAvgrating(response.data.course_rating);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // updateview
    // axios
    //   .get(`http://127.0.0.1:8000/api/update-view/${currentCourse}`)
    //   .then((res) => {
    //     setcourseViews(res.data.views);
    //   });

    // fatch enroll status
    axios
      .get(
        `${process.env.BASE_URL}fatch-enroll-status/${studentId}/${currentCourse}`
      )
      .then((response) => {
        console.log("this is a response for bool", response);
        if (response.data.bool == true) {
          setEnrollStatus("success");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // fatch rating status-
    axios
      .get(
        `${process.env.BASE_URL}fatch-rating-status/${studentId}/${currentCourse}`
      )
      .then((response) => {
        console.log("this is a response for bool", response);
        if (response.data.bool == true) {
          setratingStatus("success");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get(
        `${process.env.BASE_URL}fatch-favorite-status/${studentId}/${currentCourse}`
      )
      .then((response) => {
        console.log("this is a response for bool", response);
        if (response.data.bool == true) {
          setfavoriteStatus("success");
        } else {
          setfavoriteStatus("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus == "true") {
      setUserLoginStatus("success");
    }
  }, [""]);
  console.log("related courses", realtedCourseData);
  console.log("tech list ", techListData);

  const enrollCourse = () => {
    const studentID = localStorage.getItem("studentId");
    const courseFormData = new FormData();
    courseFormData.append("course", currentCourse);
    courseFormData.append("student", studentID as any);
    try {
      // console.log("here course form data",[...courseFormData.entries()])
      axios
        .post(`${process.env.BASE_URL}student-enroll-course/`, courseFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.status == 200 || response.status == 201) {
            Swal.fire({
              title: "You have succesfully enrolled in this course",
              icon: "success",
              toast: true,
              timer: 5000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setEnrollStatus("success");
            // window.location.reload();
          }
          // window.location.href='/teacher/add-courses';
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Mark as favorite Course
  const marksAsFavorite = () => {
    const favCourseFormData = new FormData();

    favCourseFormData.append("course", currentCourse);
    favCourseFormData.append("student", studentId as any);
    favCourseFormData.append("status", true as any);

    try {
      axios
        .post(
          `${process.env.BASE_URL}student-add-favorite-course/`,
          favCourseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response): any => {
          console.log("student favorite status", response.data);
          if (response.status == 200 || response.status == 201) {
            Swal.fire({
              title: "This course has been added in your favorite list ",
              icon: "success",
              toast: true,
              timer: 2000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setfavoriteStatus("success");
            // window.location.reload();
          }
          // window.location.href='/teacher/add-courses';
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Remove favorite Course
  const removeFavorite = () => {
    const favCourseFormData = new FormData();
    favCourseFormData.append("course", currentCourse);
    favCourseFormData.append("student", studentId as any);
    favCourseFormData.append("status", false as any);
    try {
      axios
        .post(
          `${process.env.BASE_URL}student-remove-favorite-course/${currentCourse}/${studentId}`,
          favCourseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response): any => {
          console.log("student favorite status", response.data);
          if (response.status == 200 || response.status == 201) {
            Swal.fire({
              title: "This course has been removed from your favorite list ",
              icon: "success",
              toast: true,
              timer: 2000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setfavoriteStatus("");
            
            
          }
          // window.location.href='/teacher/add-courses';
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Add Rating-
  interface ChapterData {
    rating: string;
    reviews: string;
    // 'course':string|number;
    // 'title': string;
    // 'description': string;
    // 'video': null|File |any|Blob;
    // 'video_duration': any;
    // 'remarks': string;
  }

  const [ratingData, setratingData] = useState<ChapterData>({
    rating: "",
    reviews: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = event.target;
    setratingData({
      // we pass referance CourseData and then change our name and value acording to event
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("jalksdfjlkasdjf");
    const chapterFormData = new FormData();

    chapterFormData.append("course", currentCourse);
    chapterFormData.append("student", studentId as any);
    chapterFormData.append("rating", ratingData.rating);
    chapterFormData.append("reviews", ratingData.reviews);

    // console.log("here course form data", [...chapterFormData.entries()]);

    axios
      .post(`${process.env.BASE_URL}course-rating/`, chapterFormData)
      .then((response) => {
        console.log(response.data);
        setratingData({ rating: "", reviews: "" });
        if (response.status == 200 || response.status == 201) {
          Swal.fire({
            title: "Rating has been added",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          window.location.reload();
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error here, such as displaying an error message to the user
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding data",
          icon: "error",
        });
      });
  };
  console.log("this is chapter data ", chapterData);
  return (
    <div>
      <div className="container mt-10">
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
              Course By:{" "}
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
              {/* <span>Rating: {course.course_rating}/5</span> */}
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
              {/* <span>Rating: <Rating rating={course.course_rating} /></span> */}
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
                    // tabIndex="-1"
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
                            {/* <span aria-hidden="true">&times;</span> */}
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
            {/* <p className="fw-bold">Views: {courseView}</p> */}

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
            {/* {userLoginStatus == "success" && enrollStatus !== "success" && (
              <p>
                <button
                  className="btn btn-success"
                  onClick={enrollCourse}
                  type="button"
                >
                  Enroll in this course
                </button>
              </p>
            )} */}

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
                  Please login to enroll in this course
                </Link>
              </p>
            )}
          </div>
        </div>
        {/* Course Videos */}
        {enrollStatus == "success" && userLoginStatus == "success" && (
          <div className="card mt-10 shadow">
            {chapterData.length === 0 ? (
            <p className="text-red-500 text-sm ml-14 mt-3">No Chapters There</p>) : (
            <div className="card">
              <h3 className="card-header">Course Videos</h3>
              <ul className="list-group list-group-flush">
                {chapterData &&
                  chapterData.map((chapter: any, index: any) => (
                    <li key={index} className="list-group-item">
                      {chapter.title}
                      <span className="float-end">
                        <span className="me-5">static</span>
                        <button
                          className="btn  btn-danger "
                          data-bs-toggle="modal"
                          data-bs-target={`#videoModal${index}`} // Unique modal ID
                        >
                          <FaPlayCircle size={20} />
                        </button>
                      </span>
                      {/* Video Model Start */}
                      <div
                        className="modal fade"
                        id={`videoModal${index}`} // Unique modal ID
                        // tabindex="-1"
                        aria-labelledby={`exampleModalLabel${index}`} // Unique label ID
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-xl">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`exampleModalLabel${index}`} // Unique label ID
                              >
                                {chapter.title}
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
                                  src={chapter.video}
                                  title={chapter.title}
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Video Model End */}
                    </li>
                  ))}
              </ul>
            </div>)
            }
          </div>
        )}
        {/* EndCourse Videos */}

        {/* Ratlated Course */}
        {realtedCourseData.length != 0 && (
          <h4 className="pb-1 my-4 text-start mt-5">
            Releted Courses
            <Button
              variant="contained"
              color="primary"
              href="/popular-courses"
              className="float-end ccard"
            >
              See All
            </Button>
          </h4>
        )}
        <div className="row mb-4">
          {realtedCourseData &&
            realtedCourseData.map((rcorse: any, index: any) => (
              <div className="col-md-3" key={index}>
                <div className="card ccard shadow">
                  <Link target="__blank" href={`/course-detail/${rcorse.pk}`}>
                    {/* here if we want to access the image we use whole path ,path means where our image is stored in python local dir  */}
                    <Image
                      className="card-img-top"
                      width={150}
                      height={300}
                      src={
                        rcorse.fields.featured_img
                          ? `${imageUrl}${rcorse.fields.featured_img}`
                          : `${imageUrl}/media/course_imgs/default_ctk8am`
                      }
                      alt={rcorse.fields.title}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/course-detail/${rcorse.pk}`}
                      >
                        {rcorse.fields.title}
                      </Link>
                      <p className="description">
                     {course.description.length > 30 ? `${course.description.substring(0, 100)}...` : course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                    <span>Rating: <Rating rating={course.rating} /></span>
                      <p>Price: <span className="text-black text-base">₹</span>{course.price}</p>
                      {/* <span className="float-end">
                        Views:{row.course.course_views}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Ratlated Course end*/}
      </div>
    </div>
  );
}

export default page;
