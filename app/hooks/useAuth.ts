import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

const authPath = ['/(auth)/login', '/(auth)/register'];

function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token && !authPath.includes(pathname)) {
          pathname === '/(auth)/register' ? router.replace('/(auth)/register') : router.replace('/(auth)/login');
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