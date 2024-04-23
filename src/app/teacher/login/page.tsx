
function TeacherLogin() {
 
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h3 className="card-header">User Login</h3>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                      Email
                    </label>

                    <input  name="email" type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label 
                    // for="exampleInputPassword1" 
                    className="form-label">
                      Password
                    </label>
                    <input
                    name="password"
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  {/* <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" for="exampleCheck1">
                      Remember me
                    </label>
                  </div> */}
                  <button type="submit"
                
                   className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
