'use client'

function TeacherLogout() {
  // {localStorage.getItem('teacherId') &&
  // localStorage.removeItem('teacherLoginStatus')
  // localStorage.removeItem('token')
  // localStorage.removeItem('teacherId')
  // }
  
  // {localStorage.getItem('studentId') &&
  // localStorage.removeItem('studentLoginStatus')
  // localStorage.removeItem('token')
  // localStorage.removeItem('studentId')
  // }
  localStorage.clear()
  window.location.href='/login'
  return (
    <div>
      
    </div>
  )
}

export default TeacherLogout