"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeUser } from "../redux/slice";
function page() {
  const useselcetor = useSelector((data) => data.users);
  
  const dispatch = useDispatch();
  console.log(useselcetor);
  return (
    <div>
      <h1>this is remove page</h1>
      {useselcetor.map((item) => (
        <>
          <h2>{item.name}</h2>
          <button onClick={() => dispatch(removeUser(item.id))}>remove</button>
        </>
      ))}
      
      <Link href="/">Back </Link>
    </div>
  );
}

export default page;
