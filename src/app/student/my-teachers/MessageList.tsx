"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function MessageList(props: any) {
  const [msgData, setmsgData] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(
          `http://127.0.0.1:8000/api/get-messages/${props.teacher_id}/${props.student_id}`
        )
        .then((Response) => {
          setmsgData(Response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  const fetchMsgs = () =>{
    try {
      axios
        .get(
          `http://127.0.0.1:8000/api/get-messages/${props.teacher_id}/${props.student_id}`
        )
        .then((Response) => {
          setmsgData(Response.data);
          const objDiv:any = document.getElementById("msgList");
          objDiv.scrollTop = objDiv?.scrollHeight
        });
    } catch (error) {
      console.log(error);
    }
  }
  const msgList = {
    height: "500px",
    overflow: "auto",
  };
  console.log("this is your message list dd",msgData)
  return (
    <>
    <p> <span className="ms-1 btn btn-sm btn-secondary" onClick={fetchMsgs} title="Refresh"><i className="bi bi-bootstrap-reboot"></i></span></p>
    <div style={msgList} id="msgList">
      {msgData.map((row: any, index: any) => (
        
          <div className="row mb-4">
            {row.msg_from == "student" &&
            <div className="col-4 offset-7">
              <div className="alert alert-primary mb-1">
                {row.msg_text}
              </div>
              <small className="text-muted">{row.msg_time}</small>
            </div>
            }
            {row.msg_from != "student" &&
            <div className="col-5">
              <div className="alert alert-success mb-1">
                {/* {row.msg_text} */}
                {row.msg_text}
              </div>
              <small className="text-muted">{row.msg_time}</small>
            </div>
            }
          </div>
      ))}
      </div>
    </>
  );
}

export default MessageList;

{/* <div className="col-5">
<div className="alert alert-primary mb-1">
 A simple primary alert
</div>
 <small className="text-muted">time</small> */}
// </div>
{/* My messages */}
{/* <div className="col-4 offset-7">
<div className="alert alert-success mb-1">
 heeef
</div>
  <small className="text-muted">time</small>
</div> */}

// {row.msg_from != "teacher" &&
//   <div className="row mb-4">
//     {/* from another users */}
//     <div className="col-5">
//       <div className="alert alert-primary mb-1">{row.msg_text}</div>
//       <small className="text-muted">{row.msg_time}</small>
//     </div>
//   </div>
// }
