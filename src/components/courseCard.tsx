"use client";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Home/Rating";

interface CourseProps{
    courseId:number,
    index:number,
    ImgUrl:string,
    Title:string,
    Description:string,
    cRating:number,
    Price:number|string
}

const CourseCard:React.FC<CourseProps> = ({index,courseId,ImgUrl,Title,Description,cRating,Price}) =>{

    return (
        <>
         <div className="col-md-3" key={index}>
                <div className="ccard card shadow-lg">
                  <Link href={`/course-detail/${courseId}`}>
                    <Image
                      className="card-img-top"
                      src={
                       ImgUrl
                          ?ImgUrl
                          : "/img/default.png"
                      }
                      alt={Title}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/course-detail/${courseId}`}
                      >
                        {Title}
                      </Link>
                      <p className="description">
                        {Description.length > 30
                          ? `${Description.substring(0, 100)}...`
                          : Description}
                      </p>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>
                        Rating: <Rating rating={cRating} />

                      </span>
                      <p>
                        Price: <span className="text-black text-base">₹</span>
                        {Price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
        </>
    );
}

export default CourseCard
