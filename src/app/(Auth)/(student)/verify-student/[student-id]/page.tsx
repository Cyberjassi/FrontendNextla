'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
import { Session } from "inspector";



function Verify(props:any) {
 const student_id = props.params['student-id']
 useEffect(()=>{
  document.title='Student Verify'
 })


interface StudentData {
  'otp_digit': string|Number;

}

const [StudentData, setStudentData] = useState<StudentData>({
  'otp_digit': ""
});

const [errorMsg,setErrorMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setStudentData({
    // we pass referance StudentData and then change our name and value acording to event 
    ...StudentData,
    [event.target.name]: event.target.value
  });
};
console.log(StudentData)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  // console.log(StudentData.status)
  e.preventDefault();
  const studentFormData:any = new FormData();
  studentFormData.append('otp_digit', StudentData.otp_digit);
  // studentFormData.append('password', StudentData.password);
try{
  // console.log(studentFormData)
  axios.post(`${process.env.BASE_URL}verify-student/${student_id}/`, studentFormData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      if(response.data.bool==true){
        window.location.href='/login'
        

      }else{
        setErrorMsg(response.data.msg)
      }
    })
  }catch(error){
    // setStudentData({...StudentData,status:'error'})
    // console.log(StudentData.status)
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
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                      OTP
                    </label>

                    <input  name="otp_digit" type="number"   
                    onChange={handleChange} 
                    value={StudentData.otp_digit as any}
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
