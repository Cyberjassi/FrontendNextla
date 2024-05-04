'use client'


function StudentLogout() {
  
    localStorage.clear();
//   localStorage.removeItem('studentLoginStatus')
//   localStorage.removeItem('token')
//   localStorage.removeItem('studentId')

  localStorage.clear()
  window.location.href='/login'
  return (
    <div>
      
    </div>
  )
}

export default StudentLogout
