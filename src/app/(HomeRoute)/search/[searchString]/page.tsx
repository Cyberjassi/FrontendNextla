"use client";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CourseCard from "@/components/courseCard";
import getApi from "@/helper/getApi";

function Search(props: any) {
  const searchString = props.params["searchString"];
  const [allCourses, setAllCourses] = useState<any[]>([]);

  const fetchData:any = async () =>{
  const data = await getApi(`course/?searchString=${searchString}`)
  setAllCourses(data.results)
  }
  useEffect(() => {
      fetchData()
  },
  []);

  return (
    <div>
      <>
        <div className="container mt-4">
          <h3 className="pb-1 my-4 text-start">
            Search For <span className="text-primary">{searchString}</span>
            <Button
              variant="contained"
              color="primary"
              href="/all-courses"
              className="float-end ccard"
            >
              See All
            </Button>
          </h3>
          <div className="row mb-4">
            {allCourses.length == 0 && (
              <p>No Course there for {searchString}</p>
            )}
            {allCourses &&
              allCourses.map((course: any, index: number) => (
                <CourseCard
              courseId={course.id}
              index={index}
              ImgUrl={course.featured_img}
              Title={course.title}
              Description={course.description}
              cRating={course.course_rating}
              Price={course.price}
              />
              ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default Search;
