import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const logout = () => {
  // const router = useRouter();
  // Clearing cookies
  cookie.remove('token');
  // Clearing localStorage
  localStorage.clear();
  window.location.href = '/login';
  // Redirect to the login page
  // router.push('/login');
};

export default logout;