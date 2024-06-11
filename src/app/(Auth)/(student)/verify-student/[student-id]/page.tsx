'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
import { Session } from "inspector";



function Verify(props:any) {
 const student_id = props.params['student-id']
 console.log(student_id)
 useEffect(()=>{
  document.title='Student Verify'
 })


interface StudentData {
  'otp_digit': string|Number;

}

const [StudentData, setStudentData] = useState<StudentData>({
  'otp_digit': ""
});

const [errorMsg,setErrorMsg] = useState<any>("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setErrorMsg('')
  // const { name, value } = event.target;
  setStudentData({
    // we pass referance StudentData and then change our name and value acording to event 
    ...StudentData,
    [event.target.name]: event.target.value
  });
};
console.log(StudentData)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const studentFormData:any = new FormData();
  studentFormData.append('otp_digit', StudentData.otp_digit);
try{
  axios.post(`${process.env.BASE_URL}verify-student/${student_id}/`, studentFormData)
    .then((response) => {
      console.log(response.data);
      if(response.data.bool==true){
             localStorage.setItem("studentLoginStatus", "true");
            // set teacher id in local storage for future use---
            localStorage.setItem("studentId", response.data.student_id);
            // localStorage.setItem("token", response.data.token["access"]);
            const token = response.data.token["access"];
            document.cookie = `token=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            document.cookie = "userType=student; expires=expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            
            window.location.href="/student/dashboard";
      }else{
        setErrorMsg("Wrong OTP !")
      }
    })
  }catch(error){
    console.log(error);
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
                      className="form-label text-start"
                    >
                      OTP
                    </label>

                    <input  name="otp_digit" type="number"   
                    onChange={handleChange} 
                    value={StudentData.otp_digit as any}
                    placeholder="Enter Your Otp" className="form-control" />
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
