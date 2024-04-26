'use client'
import { useEffect,useState } from "react"
import axios from "axios"

// use for set title in next app
function TeacherRegister() {
  useEffect(() => {
    document.title = "Teacher Register"
  }, [])


  interface TeacherData {
    'full_name': string;
    'email': string;
    'password': string;
    'qualification': string;
    'mobile_no': string;
    'skills': string;
    'otp_digit': string;
    'profile_img': string | File;
    'teacher_courses': number[];
    'verify_status': boolean;
    'status': boolean|string;
  }


  const [teacherData, setTeacherData] = useState<TeacherData>({
    'full_name': "",
    'email': "",
    'password': "",
    'qualification': "",
    'mobile_no': "",
    'skills': "",
    'otp_digit': "123",
    'profile_img': "",
    'teacher_courses': [4],
    'verify_status': false,
    'status': false
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setTeacherData({
      // we pass referance teacherData and then change our name and value acording to event 
      ...teacherData,
      [event.target.name]: [event.target.value]
    });
  };


  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(teacherData.status)
    e.preventDefault();
    const teacherFormData = new FormData();
    Object.entries(teacherData).forEach(([key, value]) => {
      teacherFormData.append(key, value as string | Blob);
    });
  
  try{
    
    axios.post("http://127.0.0.1:8000/api/teacher/", teacherFormData)
      .then((response) => {
        console.log(response.data);
        setTeacherData(
          {
            'full_name': "",
            'email': "",
            'password': "",
            'qualification': "",
            'mobile_no': "",
            'skills': "",
            'otp_digit': "123",
            'profile_img': "",
            'teacher_courses': [4],
            'verify_status': true,
            'status': 'success'
          }
        )
        if(response.data.bool==true){
          localStorage.setItem('teacherLoginStatus',true)
          window.location.href='/teacher/login'
        }
      })
      console.log(teacherData.status)
      
    }catch(error){
      setTeacherData({...teacherData,status:'error'})
      console.log(teacherData.status)
      console.log(error);
    }

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus == 'true'){
      window.location.href='/teacher/login'
    }
  };
  

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            {teacherData.status=='success' && <p className="text-success">Thanks for Your Registeration</p>}
            {teacherData.status=='error' && <p className="text-danger">Something Wrong Happen</p>}
            <div className="card">
              <h3 className="card-header">Teacher Register</h3>
              <div className="card-body">
                {/* submit the data thorugh form onsubmit */}
                <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label
                     htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Full Name
                    </label>
                    <input onChange={handleChange}
                    value={teacherData.full_name}
                       name="full_name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Full Name"
                    />
                   
                  </div>
                  <div className="mb-3">
                    <label
                       htmlFor="exampleInputEmail1"
                      className="form-label"
                      >
                      Email
                    </label>
                    <input onChange={handleChange}
                      value={teacherData.email}
                      placeholder="Enter Your Email"
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
                    <input onChange={handleChange}
                      name="password"
                      value={teacherData.password}
                      placeholder="Enter Your Password"
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
                    <input onChange={handleChange}
                      name="qualification"
                      value={teacherData.qualification}
                      placeholder="Enter Your Qulification"
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
                    <input onChange={handleChange}
                    value={teacherData.mobile_no}
                      name="mobile_no"
                      placeholder="Enter Your Mobile No."
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
                    value={teacherData.skills}
                    placeholder="Enter Your Skills ...."
                    onChange={handleChange}
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
