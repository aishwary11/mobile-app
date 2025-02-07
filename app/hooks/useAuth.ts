import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const authPath = ['/login', '/register'];

function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
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
  return { isAuthenticated };
}

export default useAuth;
