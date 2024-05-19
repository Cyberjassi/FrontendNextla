// utils/navigation.ts
import { useRouter } from 'next/router';

const navigateTo = (path: string): void => {
  const router = useRouter();
  router.push(path);
};

export default navigateTo;
