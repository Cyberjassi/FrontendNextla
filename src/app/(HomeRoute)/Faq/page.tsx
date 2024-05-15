"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Faq(props: any) {
  const [FaqData, setFaqData] = useState<any[]>([]); // Specify the type as an array of any
  //   const currentSkill = props.params['skill']
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/faq/`)
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
      {FaqData && FaqData.map((row,index)=>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
          {row.question}
            </button>
          </h2>

          {index==0 &&
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {row.answer}
            </div>
             </div>
            }

          {index>0 &&
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {row.answer}
            </div>
             </div>
            }

        </div>
        )}
      </div>
    </div>
  );
}
