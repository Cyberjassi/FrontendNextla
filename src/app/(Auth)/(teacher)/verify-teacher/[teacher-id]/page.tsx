'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
import { Session } from "inspector";



function Verify(props:any) {
 const teacher_id = props.params['teacher-id']
 useEffect(()=>{
  document.title='Teacher Verify'
 })


interface TeacherData {
  'otp_digit': string|Number;

}

const [teacherData, setTeacherData] = useState<TeacherData>({
  'otp_digit': ""
});

const [errorMsg,setErrorMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setTeacherData({
    // we pass referance teacherData and then change our name and value acording to event 
    ...teacherData,
    [event.target.name]: event.target.value
  });
};
console.log(teacherData)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  // console.log(teacherData.status)
  e.preventDefault();
  const teacherFormData:any = new FormData();
  teacherFormData.append('otp_digit', teacherData.otp_digit);
  // teacherFormData.append('password', teacherData.password);
try{
  // console.log(teacherFormData)
  axios.post(`${process.env.BASE_URL}verify-teacher/${teacher_id}/`, teacherFormData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      if(response.data.bool==true){
        localStorage.setItem("teacherLoginStatus", "true");
        // set teacher id in local storage for future use---
        localStorage.setItem("teacherId", response.data.teacher_id);
        // localStorage.setItem("token", response.data.token["access"]);
        const token = response.data.token["access"];
        document.cookie ="userType=teacher; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        
        window.location.href="/teacher/dashboard";
      }else{
        setErrorMsg("Wrong OTP !")
      }
    })
  }catch(error){
    // setTeacherData({...teacherData,status:'error'})
    // console.log(teacherData.status)
    console.log(error);
  }
  // get the localStorage data if it's true then redirect to teacher dashboard
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  if(teacherLoginStatus == 'true'){
    window.location.href='/teacher/dashboard'
  }
};



  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header">Enter 6 Digit OTP</h5>
              <div className="card-body">
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <form onSubmit={submitForm}>
               
                  <div className="mb-3">
                    <label
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                      OTP
                    </label>

                    <input  name="otp_digit" type="number"   
                    onChange={handleChange} 
                    value={teacherData.otp_digit as any}
                    placeholder="Enter Your Email" className="form-control" />
                  </div>
                  <button type="submit"
                   className="btn btn-primary">
                    Verify
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

export default Verify;
