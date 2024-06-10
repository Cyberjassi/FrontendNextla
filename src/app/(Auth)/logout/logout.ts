import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

const logout = () => {
  // const router = useRouter();
  // Clearing cookies
  function clearCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
  cookie.remove('token');
  clearCookie('userType');
  localStorage.clear();
  window.location.href = '/login';
  // Redirect to the login page
  // router.push('/login');
};

export default logout;