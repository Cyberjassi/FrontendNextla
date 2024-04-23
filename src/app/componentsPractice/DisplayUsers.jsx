// when we use redux we have to use useSelector hook to get the data from the store and this hook is only available in the client side
'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../redux/slice'

function DisplayUsers() {
    const userData = useSelector((data)=>data.users)
    const dispatch=useDispatch()
    console.log(userData)
  return (
    <div>
      <h2>Users...</h2>
        {
            userData.map((item)=>(
             <div>
                <div>{item.name}</div>
                <button onClick={()=>dispatch(removeUser(item.id))}>Remove</button>
              </div>
            ))
          
        }
    </div>
  )
}

export default DisplayUsers
