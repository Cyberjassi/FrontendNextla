import React from 'react'
import Link from 'next/link'

function card() {
  return (
    <div>
       <div className="card">
              <Link href="/detail/1">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/200/300"
                  alt="Card image cap"
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link href="/detail/1">Course Title</Link>
                </h5>
              </div>
              <div className="card-footer">
                <div className="title">
                  <span>Rating: 4.5/5</span>
                  
                </div>
              </div>
            </div>
    </div>
  )
}

export default card
