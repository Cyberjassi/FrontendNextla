"use client";
import Link from "next/link";
import Image from "next/image";

interface teacherProps{
    TeacherId:number,
    Index:number,
    ImgUrl:string,
    Name:string,
    TotalC:number|string
}

const TeacherCard:React.FC<teacherProps> = ({TeacherId,Index,ImgUrl,Name,TotalC}) =>{
    return(
        <>
        <div className="col-md-3" key={Index}>
                <div className="ccard card shadow-lg">
                  <Link href={`/teacher-detail/${TeacherId}`}>
                    <Image
                      className="card-img-top"
                      src={
                        ImgUrl
                          ? ImgUrl
                          : "/img/default.png"
                      }
                      alt={Name}
                      height={250}
                      width={150}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link
                        className="custom-link-style course-title"
                        href={`/teacher-detail/${TeacherId}`}
                      >
                        {Name}
                      </Link>
                    </h5>
                  </div>
                  <div className="card-footer">
                    <div className="title">
                      <span>Courses: {TotalC}</span>
                    </div>
                  </div>
                </div>
              </div>
        </>
    );
}

export default TeacherCard