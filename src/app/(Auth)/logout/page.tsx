'use client';
import cookie from 'js-cookie'
function TeacherLogout() {
  // Clearing cookies
  // document.cookie.split(";").forEach((cookie) => {
  //   const [name] = cookie.split("=");
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // });
cookie.remove('token')
  // Redirect to the login page
  window.location.href = '/login';
localStorage.clear()
  return null;
}

export default TeacherLogout;
