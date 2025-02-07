import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
// import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
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
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return fontsLoaded;
}

export default function RootLayout() {
  const fontsLoaded = useLoadFonts();
  const { isAuthenticated } = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);
  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator
          size="large"
          color="#FFFFFF"
        />
      </View>
    );
  }
  return (
    <Stack
      initialRouteName={isAuthenticated ? '(protected)/about' : '(auth)/login'}
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
