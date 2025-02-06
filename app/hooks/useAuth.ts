import { usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const authPath = ['/login', '/register'];

function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        if (!token && !authPath.includes(pathname)) {
          pathname === '/register' ? router.replace('/(auth)/register') : router.replace('/(auth)/login');
        } else if (token && authPath.includes(pathname)) {
          router.replace('/(protected)/about');
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    })();
  }, [pathname, router]);
}

export default useAuth;
