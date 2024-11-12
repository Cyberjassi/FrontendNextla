"use client";
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
import cookies from "js-cookie";
import getApi from "@/helper/getApi";
import CourseVideo from "./CourseVideos";
import CourseDetail from "./CourseDetail";
import RelatedCourse from "./RelatedCourse";

function page(props: any) {
  const currentCourse = props.params["course-id"];
  const studentId = localStorage.getItem("studentId");
  const imageUrl = "https://res.cloudinary.com/dr9wiqs2y/image/upload/v1/";
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
  const [Avgrating, setAvgrating] = useState(0);
  const [favoriteStatus, setfavoriteStatus] = useState<any>();

  // payment-
  const [amount, setAmount] = useState(500);
  const Razorpay = useRazorpay();

  const complete_order = (paymentID: any, orderID: any, signature: any) => {
    const token = cookies.get("token");
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
    const token = cookies.get("token");
    axios
      .post(`${process.env.BASE_URL}order/create/`, {
        amount: price,
        currency: "INR",
      })
      .then((response) => {
        console.log("this is a response for razorpay", response.data.data);
        const order_id = response.data.data.id;

        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id,
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
          alert(response.error.description);
        });
        rzp1.open();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //end payment
  
  const fetchData = async() =>{
    const [currentCourseData,enrollStatus,RatingStatus,FavoriteStatus] = await Promise.all([ getApi(`course/${currentCourse}`),
      getApi(`fatch-enroll-status/${studentId}/${currentCourse}`),
      getApi(`fatch-rating-status/${studentId}/${currentCourse}`),
      getApi(`fatch-favorite-status/${studentId}/${currentCourse}`),
    ])
    console.log("favrite status",FavoriteStatus.bool)
      if (enrollStatus.bool == true) {
        setEnrollStatus("success");
      }
      if (RatingStatus.bool == true) {
        setratingStatus("success");
      }
      if (FavoriteStatus.bool == true) {
        setfavoriteStatus("success");
      } else {
        setfavoriteStatus("");
      }

    setCourse(currentCourseData)
    setTeacher(currentCourseData.teacher)
    setChapterData(currentCourseData.course_chapter)
    setrealtedCourseData(JSON.parse(currentCourseData.related_videos))
    setTechListData(currentCourseData.tech_list)
    if(currentCourseData.course_rating!="" && currentCourseData.course_rating!=null){
      setAvgrating(currentCourseData.course_rating)
    }
  }

  useEffect(() => {
    fetchData()
    const studentLoginStatus = localStorage.getItem("studentLoginStatus");
    if (studentLoginStatus == "true") {
      setUserLoginStatus("success");
    }
  }, []);
  console.log("related courses", realtedCourseData);
  console.log("tech list ", techListData);

  const enrollCourse = () => {
    const studentID = localStorage.getItem("studentId");
    const courseFormData = new FormData();
    courseFormData.append("course", currentCourse);
    courseFormData.append("student", studentID as any);

    try {
      // student enroll course status-
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
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //Mark as favorite Course-
  const marksAsFavorite = () => {
    const favCourseFormData = new FormData();
    favCourseFormData.append("course", currentCourse);
    favCourseFormData.append("student", studentId as any);
    favCourseFormData.append("status", true as any);
    try {
      const token = cookies.get("token");
      axios
        .post(
          `${process.env.BASE_URL}student-add-favorite-course/`,
          favCourseFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
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
          }
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
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Add Rating-
  interface ChapterData {
    rating: string;
    reviews: string;
  }
  const [ratingData, setratingData] = useState<ChapterData>({
    rating: "",
    reviews: "",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setratingData({
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
      <CourseDetail
        course={course}
        teacher={teacher}
        techListData={techListData}
        enrollStatus={enrollStatus}
        userLoginStatus={userLoginStatus}
        ratingStatus={ratingStatus}
        favoriteStatus={favoriteStatus}
        razorpayPayment={razorpayPayment}
        submitForm={submitForm}
        handleChange={handleChange}
        ratingData={ratingData}
        marksAsFavorite={marksAsFavorite}
        removeFavorite={removeFavorite}
      />


        {/* Course Videos
        {enrollStatus == "success" && userLoginStatus == "success" && (
          <div className="card mt-10 shadow">
            {chapterData.length === 0 ? (
              <p className="text-red-500 text-sm ml-14 mt-3">
                No Chapters There
              </p>
            ) : (
              <div className="card">
                <h3 className="card-header text-center bg-primary text-white">
                  Course Videos
                </h3>
                <ul className="list-group list-group-flush">
                  {chapterData &&
                    chapterData.map((chapter: any, index: any) => (
                      <li key={index} className="list-group-item">
                        {chapter.title}
                        <span className="float-end">
                          <button
                            className="btn  btn-danger "
                            data-bs-toggle="modal"
                            data-bs-target={`#videoModal${index}`} 
                          >
                            <FaPlayCircle size={20} />
                          </button>
                        </span>
                        <div
                          className="modal fade"
                          id={`videoModal${index}`} 
                          aria-labelledby={`exampleModalLabel${index}`} 
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id={`exampleModalLabel${index}`}
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
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )} */}
        <CourseVideo
          enrollStatus={enrollStatus}
          userLoginStatus={userLoginStatus}
          chapterData={chapterData}
        />
        


        {/* Ratlated Course */}
        {/* {realtedCourseData.length != 0 && (
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
                        {course.description.length > 30
                          ? `${course.description.substring(0, 100)}...`
                          : course.description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>
                        Rating: <Rating rating={course.rating} />
                      </span>
                      <p>
                        Price: <span className="text-black text-base">₹</span>
                        {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
        <RelatedCourse
         realtedCourseData={realtedCourseData}
         course={course}
         imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}

export default page;
