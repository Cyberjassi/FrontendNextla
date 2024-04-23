import TeacherSidebar from "@/components/Teacher/Sidebar";


function TeacherChangePassword() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar></TeacherSidebar>
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h5 className="card-header">Profile Settings</h5>
            <div className="card-body">
         
            
              <div className="mb-3 row">
                <label 
                // for="inputPassword" 
                className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
                <hr />
                <button className="btn btn-primary">Update</button>
          
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherChangePassword;
