import { useFonts } from 'expo-font';
// import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import useAuth from './hooks/useAuth';

SplashScreen.preventAutoHideAsync();
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

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

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();
  useAuth();
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
        name="(auth)/register"
        options={{ title: 'Register', headerShown: false }}
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
