'use client'
import { useEffect,useState } from "react";
import axios from 'axios'
// import navigateTo from "@/app/utils/navigation";
// import { useRouter } from 'next/navigation'
import Link from "next/link";

function StudentChangPassword(props:any) {

 const student_id = props.params['student-id']
 useEffect(()=>{
  document.title='Student Change Password'
 })

interface student {
  'password': string;

}

const [student, setstudent] = useState<student>({
  'password': "",

});

const [errorMsg,setErrorMsg] = useState("");
const [successMsg,setSuccessMsg] = useState("");

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  // const { name, value } = event.target;
  setstudent({
    // we pass referance student and then change our name and value acording to event 
    ...student,
    [event.target.name]: event.target.value
  });
};
console.log(student)

const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  // console.log(student.status)
  e.preventDefault();
  const StudentFormData = new FormData();
  StudentFormData.append('password', student.password);
  // StudentFormData.append('password', student.password);
try{
  // console.log(StudentFormData)
  axios.post(`${process.env.BASE_URL}student-change-password/${student_id}/`, StudentFormData)
    .then((response) => {
      console.log(response.data);
      // if backend server response bool is true then we set in local storage
      //  then we redirect to Student dashboard and set it true
      if(response.data.bool==true){
        setSuccessMsg(response.data.msg)
        setErrorMsg('');

      }else{
        setErrorMsg(response.data.msg)
        setSuccessMsg('')
      }
    })
  }catch(error){
    // setstudent({...student,status:'error'})
    // console.log(student.status)
    console.log(error);
  }
  // get the localStorage data if it's true then redirect to Student dashboard
 
};



  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="card">
              <h5 className="card-header">  Enter Your Password</h5>
              <div className="card-body">
                {successMsg && <p className="text-success">{successMsg}</p>}
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <form onSubmit={submitForm}>
               
                  <div className="mb-3">
                    <label
                    //   for="exampleInputEmail1"
                      className="form-label text-start"
                    >
                     Email
                    </label>

                    <input  name="password" type="password"   
                    onChange={handleChange} 
                    value={student.password}
                    placeholder="Enter Your Email" className="form-control" />
                  </div>
                  <button type="submit"
                   className="btn btn-primary">
                    Change
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

export default StudentChangPassword;
