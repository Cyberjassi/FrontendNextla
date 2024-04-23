'use client'
import React, { useState } from 'react'
import {addUser} from '../redux/slice'
import { useDispatch } from 'react-redux';
import Link from 'next/link'


function AddUsers() {

    
    const [name,setName] = useState("");
    const dispatch = useDispatch()
    const userDispatch=()=>{
        dispatch(addUser(name))
    }

  return (
    <div>
     {/* '/practiceremove'> */}
   
       

      <h2>Add User...</h2>
      <input type="text" name="" id="" 
      onChange={(e)=>setName(e.target.value)}
      placeholder='add new user..'/>
      <button onClick={userDispatch}>add</button><br /><br />
      <Link href='/practiceremove'>Go to Remove User</Link>
    </div>

  )
}

export default AddUsers
