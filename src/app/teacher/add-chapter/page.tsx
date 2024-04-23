
import Link from "next/link";
import TeacherSidebar from "@/components/Teacher/Sidebar";

function AddChapter() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <form className="container">
              <div className="mb-3">
                <label
                //  for="exampleInputEmail1"
                  className="form-label ">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label
                //  for="exampleInputPassword1" 
                 className="form-label">
                  Description
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label 
                // for="exampleInputEmail1"
                 className="form-label">
                 Video
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label 
                // for="exampleInputPassword1"
                 className="form-label" >
                  Remarks
                </label>
                <div className="form-floating">
                  <textarea
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

export default AddChapter;
