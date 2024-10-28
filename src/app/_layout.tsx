import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../Styling/Theme';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"; // Optional
import { Platform } from 'react-native';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    if (Constants.easConfig?.projectId) {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId,
        })
      ).data;
      console.log(token);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Layout() {
  const theme = useTheme();
  
  if (Platform.OS !== 'web') {
    useEffect(() => {
      registerForPushNotificationsAsync();
    }, []);
  }
  

  return (
    <GestureHandlerRootView style={{flex: 1,}}>
      <ThemeProvider>
        <StatusBar style='light'/>
        <Stack screenOptions={{
            headerTintColor: theme.whiteText,
            headerStyle: {
              backgroundColor: theme.whisperGreen,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: theme.whiteText,
            },
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}