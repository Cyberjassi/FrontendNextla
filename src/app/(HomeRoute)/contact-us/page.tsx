"use client";
import React, { useState } from "react";
import { handleApiError } from "@/app/errorHandling";
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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactFormData = new FormData();
    Object.entries(contactData).forEach(([key, value]) => {
      contactFormData.append(key, value as string | Blob);
    });
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}contact/`,
        contactFormData
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setContactData({
          full_name: "",
          email: "",
          query_txt: "",
          status: "success",
        });
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorData = "All field Are Required!";
        handleApiError(errorData as any);
      }
      console.log(error);
    }
  };

  const listStyle = {
    listStyle: "none",
  };

  return (
    <div className="container mt-10">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              Contact Us
            </h5>
            <div className="card-body shadow">
              {contactData.status === "success" && (
                <p className="text-success">Thanks for Contacting Us</p>
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
                    rows={3}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <h5 className="card-header text-center bg-primary text-white">
              Address
            </h5>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <label className="fw-bold">Address:</label>
                  <span className="ms-2">27, Kagdipura, Mandsaur</span>
                </li>
                <li className="mb-3">
                  <label className="fw-bold">Mobile No.:</label>
                  <span className="ms-2">987654333</span>
                </li>
                <li className="mb-3">
                  <label className="fw-bold">Email:</label>
                  <span className="ms-2">example@email.com</span>
                </li>
                <li className="mb-3">
                  <label className="fw-bold">City:</label>
                  <span className="ms-2">Surat Gujrat,</span>
                </li>
                <li className="mb-3">
                  <label className="fw-bold">Country:</label>
                  <span className="ms-2">India</span>
                </li>
                <li className="mb-3">
                  <label className="fw-bold">Postal Code:</label>
                  <span className="ms-2">123456</span>
                </li>
                {/* Add more fields as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
