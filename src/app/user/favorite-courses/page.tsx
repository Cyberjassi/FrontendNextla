
import Link from "next/link";
import UserSidebar from "@/components/User/UserSidebar";


function FavoriteCourses() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar></UserSidebar>
        </aside>
        <section className="col-md-9">
         <div className="card">
            <h5 className="card-header">Favorite Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>Php Development</td>
                  <td>
                    <Link href="/">Suraj Kumar</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger active">Delete</button>
                  </td>
                </tbody>
              </table>
            </div>
          </div> 
        </section>
      </div>
    </div>
  );
}

export default FavoriteCourses;

