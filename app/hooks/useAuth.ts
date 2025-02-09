import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const authPaths = new Set(['/login', '/register']);

function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const token = Platform.OS === 'web' ? await AsyncStorage.getItem('token') : await SecureStore.getItemAsync('token');
        const isUserAuthenticated = Boolean(token);
        setIsAuthenticated(isUserAuthenticated);
        if (isMounted) {
          if (!isUserAuthenticated && !authPaths.has(pathname)) {
            pathname === '/register' ? router.replace('/(auth)/register') : router.replace('/(auth)/login');
          } else if (isUserAuthenticated && authPaths.has(pathname)) {
            router.replace('/(protected)/about');
          }
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
        if (isMounted) {
          router.replace('/(auth)/login');
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [pathname, router]);
  return { isAuthenticated };
}

export default useAuth;
