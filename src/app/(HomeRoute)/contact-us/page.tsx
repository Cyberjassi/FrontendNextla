'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

function ContactUs() {

  interface ContactData {
    full_name: string;
    email: string;
    query_txt: string;
    status: string;
  }
  const [contactData, setContactData] = useState<ContactData>({
    full_name: "",
    email: "",
    query_txt: "",
    status: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value
    });
  };

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactFormData = new FormData();
    Object.entries(contactData).forEach(([key, value]) => {
      contactFormData.append(key, value as string | Blob);
    });
    try {
      axios.post("http://127.0.0.1:8000/api/contact/", contactFormData)
        .then((response) => {
          console.log(response.data);
          setContactData({
            full_name: "",
            email: "",
            query_txt: "",
            status: "success",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const listStyle = {
    listStyle: 'none'
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <h3 className="card-header">Contact Us</h3>
            <div className="card-body">
              {contactData.status === "success" && (
                <p className="text-success">Thanks for Contacting Us</p>
              )}
              {contactData.status === "error" && (
                <p className="text-danger">Something Went Wrong</p>
              )}
              <form onSubmit={send}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={contactData.full_name}
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
                    value={contactData.email}
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
                    value={contactData.query_txt}
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
        <div className="col-lg-4 ">
          <h3 className="card-header">Address</h3>
          <ul className="m-0 p-0" style={listStyle}>
            <li>
              <label className="fw-bold" htmlFor="">Address:</label>
              <span className="ms-2">27,Kagdipura,Mandsaur</span>
            </li>
            <li>
              <label className="fw-bold" htmlFor="">Mobile No.:</label>
              <span className="ms-2">987654333</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
