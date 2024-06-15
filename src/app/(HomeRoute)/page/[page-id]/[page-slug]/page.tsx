'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Pages(props: any) {
  const [pagesData, setPagesData] = useState<any|string[]>([]);
  const page_id = props.params['page-id']
  const page_slug = props.params['page-slug']
  
  useEffect(() => {
    axios.get(`${process.env.BASE_URL}${page_id}/${page_slug}`)
      .then(response => {
        console.log('Data:', response.data);
        setPagesData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  console.log(pagesData)
  console.log("this is slug",page_slug)
  console.log("this is id",page_id)
  return (
   <div className="container mt-4">
          <h2>{pagesData.title}</h2>
          <p>{pagesData.content}</p>
    </div>
  )
}
