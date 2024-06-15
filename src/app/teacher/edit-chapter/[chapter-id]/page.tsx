"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Swal from "sweetalert2";
import editchapterMaterialSchmea from "./editchapterYup";
import { useFormik } from "formik";

function page(props: any) {
  const currentChapter = props.params["chapter-id"];
  const [response, setResponse] = useState<any>(null);
  const [chapterData, setChapterData] = useState<any>({
    course: "",
    prev_video: "",
    video: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}chapter/${currentChapter}`
        );
        setResponse(response.data);
        Formik.setValues({
          title: response.data.title || "",
          description: response.data.description || "",
          remarks: response.data.remarks || "",
        });
        setChapterData({
          course: response.data.course,
          prev_video: response.data.video,
          video: "",
        });
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };
    fetchData();
  }, [currentChapter]);
  const Formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      remarks: "",
    },
    validationSchema: editchapterMaterialSchmea,
    onSubmit: async (values: any, { setSubmitting }) => {
      try {
        await submitForm(values);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setChapterData((prevChapterData: any) => ({
        ...prevChapterData,
        video: file,
      }));
    }
  };
  const submitForm = async (values: any) => {
    Swal.fire({
      title: "Wait a moment....",
      html: '<div class="full-screen-toast"><div class="loader"></div></div>',
      icon: "warning",
      toast: true,
      timer: 60000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
      customClass: {
        popup: "full-screen-popup",
      },
    });
    const chapterFormData = new FormData();
    chapterFormData.append("course", chapterData.course);
    chapterFormData.append("title", values.title);
    chapterFormData.append("description", values.description);
    if (chapterData.video !== "") {
      chapterFormData.append("video", chapterData.video);
    }
    chapterFormData.append("remarks", values.remarks);
    try {
      const response = await axios.put(
        `${process.env.BASE_URL}chapter/${currentChapter}`,
        chapterFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        Swal.fire({
          title: "Data has been Updated",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-10">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card shadow">
            <h5 className="card-header text-center bg-primary text-white">
              Edit Chapter
            </h5>
            <form onSubmit={Formik.handleSubmit} className="container mt-3">
              <div className="mb-3">
                <label className="form-label ">Title</label>
                <input
                  value={Formik.values.title}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {Formik.errors.title && Formik.touched.title ? (
                  <p className="text-sm text-red-600">
                    {Formik.errors.title as any}
                  </p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    value={Formik.values.description}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                  {Formik.errors.description && Formik.touched.description ? (
                    <p className="text-sm text-red-600">
                      {Formik.errors.description as any}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Video
                </label>
                <input
                  onChange={handleFileChange}
                  name="video"
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {chapterData.prev_video && (
                  <video height="40%" width="40%" className="mt-2" controls>
                    <source src={chapterData.prev_video} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  remarks
                </label>
                <div className="form-floating">
                  <textarea
                    value={Formik.values.remarks}
                    onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur}
                    name="remarks"
                    className="form-control"
                    placeholder="This Video is Focused on basic Introduction"
                    id="floatingTextarea2"
                  ></textarea>
                  {Formik.errors.remarks && Formik.touched.remarks ? (
                    <p className="text-sm text-red-600">
                      {Formik.errors.remarks as any}
                    </p>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
