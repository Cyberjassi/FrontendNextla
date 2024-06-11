'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
// import { useRouter } from 'next/navigation'
import Link from "next/link";
import { handleApiError } from "@/app/errorHandling";
import Swal from "sweetalert2";

function FogotPassword() {

  // const router = useRouter()
 useEffect(()=>{
  document.title='Student Forgot Password'
 })

interface StudentData {
  'email': string;

}

const [StudentData, setStudentData] = useState<StudentData>({
  'email': "",

});


const [successMsg,setSuccessMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setSuccessMsg('')
  setStudentData({
    ...StudentData,
    [event.target.name]: event.target.value
  });
};
console.log(StudentData)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const studentFormData = new FormData();
  studentFormData.append('email', StudentData.email);
  // studentFormData.append('password', StudentData.password);
try{
  Swal.fire({
    title: 'Wait a moment....',
    html: '<div class="full-screen-toast"><div class="loader"></div></div>',
    icon: 'warning',
    toast: true,
    timer: 5000,
    position: 'top-right',
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: 'full-screen-popup' 
    }
  });
  axios.post(`${process.env.BASE_URL}student-forgot-password/`, studentFormData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      setStudentData({email:''})
      if(response.data.bool==true){
        setSuccessMsg(response.data.msg)


      }else{
        handleApiError(response.data.msg)
        setSuccessMsg('')
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
              <h5 className="card-header">  Enter Your Registered Email</h5>
              <div className="card-body">
                {successMsg && <p className="text-success">{successMsg}</p>}
                <form onSubmit={submitForm}>
               
                  <div className="mb-3">
                    <label
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                     Email
                    </label>

                    <input  name="email" type="email"   
                    onChange={handleChange} 
                    value={StudentData.email}

                    placeholder="Enter Your Email"
                     className="form-control" />
                  </div>
                  <button type="submit"
                   className="btn btn-primary">
                    Send Email
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

export default FogotPassword;
