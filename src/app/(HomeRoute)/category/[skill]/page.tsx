
import Link from 'next/link'
export default function CategoryCourses() {
  return (
    <div className="container mt-3">
     <h3 className="pb-1 my-4 text-start">
          WebDevelopment Courses{" "}
          
        </h3>
        <div className="row mb-4">
          <div className="col-md-3 mb-4">
            <div className="card">
            <Link href="/course-detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/course-detail/1">Course Title</Link>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card">
              <a href="#">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a href="#">Course Title</a>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card">
            <Link href="/course-detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/course-detail/1">Course Title</Link>
                </h5>
              </div>
            </div>
          </div>  <div className="col-md-3 mb-4">
            <div className="card">
            <Link href="/course-detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/course-detail/1">Course Title</Link>
                </h5>
              </div>
            </div>
          </div>  <div className="col-md-3 mb-4">
            <div className="card">
            <Link href="/course-detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/course-detail/1">Course Title</Link>
                </h5>
              </div>
            </div>
          </div>  <div className="col-md-3 mb-4">
            <div className="card">
            <Link href="/course-detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/course-detail/1">Course Title</Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* End Latest Courses */}

        {/* Pagination Start */}
        <nav aria-label="Page navigation example mt-5">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
        {/* Pagination End */}
    </div>
  )
}
