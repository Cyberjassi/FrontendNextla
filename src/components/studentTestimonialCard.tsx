"use client";
interface studentTestimonialProps{
    studetTestimonnialData:any
}

const StudentTestimonialCard:React.FC<studentTestimonialProps> = ({studetTestimonnialData}) => {
    return(
        <>
        <h3 className="pb-1 my-4 mt-4 course-heading">Student Testimonial</h3>
          <div
            id="carouselExampleIndicators"
            className="carousel slide bg-primary text-white py-5"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {studetTestimonnialData &&
                studetTestimonnialData.map((row:any, index:any) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className={index == 0 ? "active" : ""}
                  ></button>
                ))}
            </div>
            <div className="carousel-inner">
              {studetTestimonnialData &&
                studetTestimonnialData.map((row:any, i:number) => (
                  <div
                    key={i}
                    className={
                      i == 0
                        ? "carousel-item text-center active"
                        : "carousel-item text-ceter"
                    }
                  >
                    <figure className="text-center">
                      <blockquote className="blockquote">
                        <p>{row.reviews}</p>
                      </blockquote>
                      <figcaption className="blockquote-footer text-white">
                        {row.course.title} &nbsp;
                        <cite title="Source Title">
                          {row.student.full_name}
                        </cite>
                      </figcaption>
                    </figure>
                  </div>
                ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
    )
}

export default StudentTestimonialCard