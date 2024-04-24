"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { removeUser } from "../redux/slice";


import { getTeacherInfo } from "../redux/teacher/todo";

function page() {
  // const useselcetor = useSelector((data) => data.users);
  
  // const dispatch = useDispatch();

  // console.log(useselcetor);
  const dispatch = useDispatch();
  const state = useSelector((state)=>state);
  console.log("State",state)

  if (state.todo.isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>this is remove page</h1>
      {/* {useselcetor.map((item) => (
        <>
          <h2>{item.name}</h2>
          <button onClick={() => dispatch(removeUser(item.id))}>remove</button>
        </>
      ))} */}



      <button onClick={()=>dispatch(getTeacherInfo())}>Fetch Todo </button>
      {
       state.todo.data&&state.todo.data.map ((item)=>(
        <>
        <h2>{item.title}</h2>
        <h2>{item.full_name}</h2>
        <h2>{item.id}</h2>
        </>
       ))
      }
      
      <Link href="/">Back </Link>
    </div>
  );
}

export default page;
