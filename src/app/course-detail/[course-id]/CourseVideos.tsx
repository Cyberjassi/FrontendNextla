"use client";

import { FaPlayCircle } from "react-icons/fa";

interface CourseVideoProps{
    enrollStatus:any,
    userLoginStatus:any,
    chapterData:any
}

const CourseVideo:React.FC<CourseVideoProps> = ({enrollStatus,userLoginStatus,chapterData})=>{
    return(
        <>
          {/* Course Videos */}
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
        )}

        </>
    );
}

export default CourseVideo;