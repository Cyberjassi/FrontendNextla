"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Faq(props: any) {
  const [FaqData, setFaqData] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.BASE_URL}faq/`)
      .then((response) => {
        console.log("Data:", response.data);
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container mt-3">
      <h3 className="pb-1 my-4 text-start">FAQs</h3>
      <div className="accordion" id="accordionExample">
        {FaqData &&
          FaqData.map((row, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {row.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  index === 0 ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">{row.answer}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
