'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
import { handleApiError } from "@/app/errorHandling";
import Swal from "sweetalert2";
// import navigateTo from "@/app/utils/navigation";
// import { useRouter } from 'next/navigation'


function FogotPassword() {

  // const router = useRouter()
 useEffect(()=>{
  document.title='Teacher Forgot Password'
 })

interface TeacherData {
  'email': string;

}

const [teacherData, setTeacherData] = useState<TeacherData>({
  'email': "",

});

const [successMsg,setSuccessMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setSuccessMsg('')
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
  const teacherFormData = new FormData();
  teacherFormData.append('email', teacherData.email);
  // teacherFormData.append('password', teacherData.password);
try{
  // console.log(teacherFormData)
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
  axios.post(`${process.env.BASE_URL}teacher-forgot-password/`, teacherFormData)
    .then((response) => {
      console.log(response.data);
     
      // if backend server response bool is true then we set in local storage
      //  then we redirect to teacher dashboard and set it true
      setTeacherData({email:''})
      if(response.data.bool==true){
        setSuccessMsg(response.data.msg)

      }else{
        handleApiError(response.data.msg)
        setSuccessMsg('')
      }
    })
  }catch(error){
    // setTeacherData({...teacherData,status:'error'})
    // console.log(teacherData.status)
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
                    value={teacherData.email}

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
