"use client";
import React, { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Link from "next/link";

// for sweetalert---
import Swal from 'sweetalert2'
import axios from "axios";



function Page(props: any) {
  const [chapterData, setChapterData] = useState([]);
  // count all chapters-
  const [totalResult, setTotalResult] = useState([0]);
  const currentChapter = props.params["chapter-id"];

  useEffect(() => {
    fetch(`http://localhost:8000/api/course-chapters/${currentChapter}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalResult(data.length);
        setChapterData(data);
      });
  }, []);
  // console.log("this is my chapters", chapterData);
 
  // for sweetalert---
  // const Swal = require('sweetalert2')
  const handleDeleteClick = (chapter_id:any) => {
    console.log("..................",chapter_id)

    Swal.fire({
      title: "Confirm",
      text: "Are you sure you want to delete this data?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:8000/api/chapter/${chapter_id}`)
            .then((res) => {
              console.log(res)
              window.location.reload();
            })
            .catch((error) => {
              Swal.fire('error', 'Data has not been deleted!!', 'error');
            });
        } catch (error) {
          Swal.fire('error', 'Data has not been deleted!!', 'error');
        }
      }else{
        Swal.fire('error','Data has not been deleted!!');
      }
    });
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">All Chapters ({totalResult})</h5>
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
                          <Link href="#">{chapter.title}</Link>
                        </td>
                        <td>
                          <video width="320" height="240" controls>
                            {/* Check if video source is available */}
                            {chapter.video && (
                              <>
                                {/* Check if mp4 format is available */}
                                {chapter.video.mp4 && (
                                  <source
                                    src={chapter.video.mp4.url}
                                    type="video/mp4"
                                  />
                                )}
                                {/* Check if ogg format is available */}
                                {chapter.video.ogg && (
                                  <source
                                    src={chapter.video.ogg.url}
                                    type="video/ogg"
                                  />
                                )}
                                {/* Check if webm format is available */}
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
                          <Link href="#">{chapter.remarks}</Link>
                        </td>
                        <td>
                          <Link
                            href={`/teacher/edit-chapter/${chapter.id}`}
                            className="btn btn-info btn-sm ms-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            onClick={()=>handleDeleteClick(chapter.id)}
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
