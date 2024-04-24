'use client'
import { useEffect } from "react"

// use for set title in next app
function TeacherRegister() {
     useEffect(()=>{
      document.title= "Teacher Register"
     })
 
  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h3 className="card-header">Teacher Register</h3>
              <div className="card-body">
                <form>
                <div className="mb-3">
                    <label
                     htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Full Name
                    </label>
                    <input
                       name="full_name"
                      type="text"
                      className="form-control"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label
                       htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      name="email"

                      type="email"
                      className="form-control"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label 
                   htmlFor="exampleInputPassword1" 
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
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Qualification
                    </label>
                    <input
                      name="qualification"
                    
                      type="text"
                      className="form-control"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Mobile Number
                    </label>
                    <input
                      name="mobile_no"
                   
                      type="integer"
                      className="form-control"
                    />
                   
                  </div>
                 
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Skills
                    </label>
                    <textarea 
                    name="skills"
                    
                    className='form-control' ></textarea>
                    <div id="emailHelp" className="form-text">Php,Python,JavaScript,etc</div>
                   
                  </div>
                 
                  <button  type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherRegister
