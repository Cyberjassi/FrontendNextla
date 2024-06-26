"use client";
import { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Link from "next/link";
import Swal from "sweetalert2";
import axios from "axios";

function Page(props: any) {
  const [chapterData, setChapterData] = useState([]);
  const [totalResult, setTotalResult] = useState([0]);
  const currentChapter = props.params["chapter-id"];
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}course-chapters/${currentChapter}`)
      .then((response) => {
        const data = response.data;
        setTotalResult(data.length);
        setChapterData(data);
      })
      .catch((error) => {
        console.error("Error fetching course chapters:", error);
      });
  }, []);

  const handleDeleteClick = (chapter_id: any) => {
    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this data?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`${process.env.BASE_URL}chapter/${chapter_id}`)
            .then((res) => {
              console.log(res);
              Swal.fire("success", "Data has been deleted. ");
              axios
                .get(`${process.env.BASE_URL}course-chapters/${currentChapter}`)
                .then((response) => {
                  const data = response.data;
                  setTotalResult(data.length);
                  setChapterData(data);
                })
                .catch((error) => {
                  console.error("Error fetching course chapters:", error);
                });
            })
            .catch((error) => {
              Swal.fire("error", "Data has not been deleted!!", "error");
            });
        } catch (error) {
          Swal.fire("error", "Data has not been deleted!!", "error");
        }
      } else {
        Swal.fire("error", "Data has not been deleted!!");
      }
    });
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
              All Chapters ({totalResult}){" "}
              <Link
                href={`/teacher/add-chapter/${currentChapter}`}
                className="btn btn-sm btn-warning float ccard"
              >
                Add chapter
              </Link>
            </h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Video</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {!chapterData ? (
                    <p>Loading....</p>
                  ) : (
                    chapterData &&
                    chapterData.map((chapter: any, index: any) => (
                      <tr key={index}>
                        <td>
                          <p className="custom-link-style">{chapter.title}</p>
                        </td>
                        <td>
                          <video width="200" height="50" controls>
                            {chapter.video && (
                              <>
                                {chapter.video.mp4 && (
                                  <source
                                    src={chapter.video.mp4.url}
                                    type="video/mp4"
                                  />
                                )}
                                {chapter.video.ogg && (
                                  <source
                                    src={chapter.video.ogg.url}
                                    type="video/ogg"
                                  />
                                )}
                                {chapter.video.webm && (
                                  <source
                                    src={chapter.video.webm.url}
                                    type="video/webm"
                                  />
                                )}
                              </>
                            )}
                            Your browser does not support the video tag.
                          </video>
                        </td>
                        <td>
                          <p className="custom-link-style">{chapter.remarks}</p>
                        </td>
                        <td>
                          <Link
                            href={`/teacher/edit-chapter/${chapter.id}`}
                            className="btn btn-info btn-sm ms-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(chapter.id)}
                            className="btn btn-danger btn-sm  ms-2"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
