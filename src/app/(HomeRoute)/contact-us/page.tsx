'use client'
import React, { useEffect, useState } from "react";
import axios from "axios"
// import studentRegister from "@/app/user/registration/page"

// use for set title in next app
function ContactUs() {

  interface ContactData {
    'full_name': string;
    'email': string;
    'query_txt': string;
    'status': string;
  }
  const [ContactData, setContactData] = useState<ContactData>({
    'full_name': "",
    'email': "",
    'query_txt': "",
    'status': "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const { name, value } = event.target;
    setContactData({
      // we pass referance ContactData and then change our name and value acording to event 
      ...ContactData,
      [event.target.name]: [event.target.value]
    });
  };

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactFormData = new FormData();
    Object.entries(ContactData).forEach(([key, value]) => {
      contactFormData.append(key, value as string | Blob);
    });
  try{
    axios.post("http://127.0.0.1:8000/api/contact/", contactFormData)
      .then((response) => {
        console.log(response.data);
        setContactData(
          {
            'full_name': "",
            'email': "",
            'query_txt': "",
            'status': "success",
          }
        )
      })

    }catch(error){
      console.log(error);
    }

  };




  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-8 offset-2">
            {ContactData.status == "success" && (
              <p className="text-success">Thanks for Contact Us</p>
            )}
            {ContactData.status == "error" && (
              <p className="text-danger">Something Wrong Happen</p>
            )}
            <div className="card">
              <h3 className="card-header">Contact Us</h3>
              <div className="card-body">
            
                <form onSubmit={send}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={ContactData.full_name}
                      name="full_name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Full Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={ContactData.email}
                      placeholder="Enter Your Email"
                      name="email"
                      type="email"
                      className="form-control"
                    />
                  </div>
                 
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Query
                    </label>
                    <textarea
                      value={ContactData.query_txt}
                      placeholder="Enter Your Query ...."
                      onChange={handleChange}
                      name="query_txt"
                      className="form-control"
                      rows={10}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send
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

export default ContactUs
