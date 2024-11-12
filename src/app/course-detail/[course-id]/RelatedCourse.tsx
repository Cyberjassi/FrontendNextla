"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Rating from "@/components/Home/Rating";


interface RelatedCourseProps{
    realtedCourseData:any,
    course:any,
    imageUrl:any,
}

const RelatedCourse:React.FC<RelatedCourseProps> = ({imageUrl,course,realtedCourseData})=>{
    return (
        <>
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
        </div>
        </>
    )
}

export default RelatedCourse
