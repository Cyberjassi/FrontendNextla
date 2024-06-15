
import cookie from 'js-cookie';

const logout = () => {
  function clearCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
  cookie.remove('token');
  clearCookie('userType');
  localStorage.clear();
  window.location.href = '/login';
};

export default logout;