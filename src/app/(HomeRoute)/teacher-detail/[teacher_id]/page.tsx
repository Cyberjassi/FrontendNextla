import React from 'react'
import Link from 'next/link'
function TeacherDetail() {
  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-4">
            <img
              className="img-thumbnail"
              src="https://picsum.photos/200/300"
              alt="Teacher image"
            />
          </div>
          <div className="col-8">
            <h3>Ramprasad</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur eaque veritatis in unde laudantium temporibus ut! Nam
              illum velit sequi ea quibusdam aperiam et perferendis, facilis
              voluptas? Quis iure necessitatibus inventore quod laboriosam
              veritatis labore nesciunt aliquid, dicta, cumque placeat obcaecati
              dolorem totam laborum eos.
            </p>
            <p className="fw-bold">
              Skills: <Link href="/category/php">Php</Link>,<Link href="/category/php">Python</Link>,<Link href="/category/php">Java</Link>,
            </p>
            <p className="fw-bold">Recent Course: <Link href="/teacher-detail/1">Php</Link></p>
           
            <p className="fw-bold">Rating: 4.5/5 </p>
          </div>
        </div>
        {/* Course Videos */}
        <div className="card mt-4">
          <div className="card mt-4">
            <h3 className="card-header">Course List</h3>
            <div className="list-group list-group-flush">
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
               <Link href='/teacher-detail/1' className='list-group-item text-start kust-group-item-action'>Php Course 1</Link>
              
            </div>
          </div>
        </div>
        {/* EndCourse Videos */}

        {/* Ratlated Course */}
      
      </div>
    </div>
  )
}

export default TeacherDetail
