"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import TeacherSidebar from "@/components/Teacher/Sidebar";
import Swal from "sweetalert2";

function page(props: any) {
  const currentChapter = props.params["chapter-id"];
  // console.log("this is current course",currentCourse)

  interface ChapterData {
    course: string | number;
    title: string;
    description: string;
    prev_video:any;
    video: null | File | any | Blob;
    remarks: string;
  }

  const [chapterData, setChapterData] = useState<ChapterData>({
    course: "",
    title: "",
    description: "",
    prev_video:"",
    video: "",
    remarks: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file from the input
      setChapterData((prevChapterData) => ({
        ...prevChapterData,
        video: file,
      }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = event.target;
    setChapterData({
      // we pass referance CourseData and then change our name and value acording to event
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const chapterFormData = new FormData();
    
    chapterFormData.append('course',chapterData.course); 
    chapterFormData.append('title', chapterData.title);
    chapterFormData.append('description', chapterData.description);
    if(chapterData.video!==''){
        chapterFormData.append('video', chapterData.video);
    }
    chapterFormData.append('remarks', chapterData.remarks);
  
    try {
      console.log("here course form data", [...chapterFormData.entries()]);
      
      axios.put(`http://127.0.0.1:8000/api/chapter/${currentChapter}`, chapterFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((response) => {
        console.log(response.data);
        if(response.status==200){
        
        Swal.fire({
        title: "Data has been Updated",
        icon: "success",
        toast:true,
        timer:3000,
        position:'top-right',
        timerProgressBar:true,
        showConfirmButton: false,
     
        });
    
        }
      })   
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/chapter/${currentChapter}`)
      .then((response) => {
        setChapterData(response.data);
        setChapterData({
            course: response.data.course,
            title: response.data.title,
            description: response.data.description,
            prev_video:response.data.video,
            remarks: response.data.remarks,
            video:''
        })
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching chapter data:', error);
      });
  }, []);
  console.log("this is chapter data ",chapterData)
//   console.log(chapterData.id)
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Edit Chapter</h5>
            <form onSubmit={submitForm} className="container">
              <div className="mb-3">
                <label
                  //  for="exampleInputEmail1"
                  className="form-label "
                >
                  Title
                </label>
                <input
                  onChange={handleChange}
                  value={chapterData.title}
                  name="title"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                  //  for="exampleInputPassword1"
                  className="form-label"
                >
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    value={chapterData.description}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label
                  // for="exampleInputEmail1"
                  className="form-label"
                >
                  Video
                </label>
                <input
                  onChange={handleFileChange}
                  // value={chapterData.video}
                  name="video"
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {chapterData.prev_video &&
                <video width="100%" className="mt-2" controls >
                  {/* <source
                    src={chapterData.prev_video}
                    type="video/webm"
                  /> */}
                  <source src={chapterData.prev_video} type="video/mp4" />
                   {/* Sorry, Your browser doesn't support embedded videos. */}
                </video>
                }
              </div>
              <div className="mb-3">
                <label
                  // for="exampleInputPassword1"
                  className="form-label"
                >
                  remarks
                </label>
                <div className="form-floating">
                  <textarea
                    onChange={handleChange}
                    value={chapterData.remarks}
                    name="remarks"
                    className="form-control"
                    placeholder="This Video is Focused on basic Introduction"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
