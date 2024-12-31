import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

function useLoadFonts() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return loaded;
}

function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (!isLoggedIn && !pathname.startsWith('/(auth)/login')) {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    })();
  }, [pathname, router]);
}

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();
  useAuthRedirect();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      initialRouteName="(auth)/login"
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Screen
        name="(auth)/login"
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen
        name="(protected)/about"
        options={{ title: 'About', headerShown: false }}
      />
      <Stack.Screen
        name="(protected)/contact"
        options={{ title: 'Contact', headerShown: false }}
      />
    </Stack>
  );
}
