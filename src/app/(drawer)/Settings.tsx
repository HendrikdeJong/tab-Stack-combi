import { View, Text, ScrollView, StyleSheet, Button, Platform } from 'react-native';
import { useTheme } from '../../Styling/Theme';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { router, useNavigation } from 'expo-router';

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "An Alarm has gone off!",
      body: 'Click here to see more details',
      data: { screen: 'Alerts'},
    },
    trigger: null,
  });
}

export default function Settings() {
  const theme = useTheme();
  const navigation = useNavigation();
  const GetOSPlatform = Platform.OS !== 'android';

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data.screen;
      if (screen) {
        router.navigate(screen);
      }
    });

    return () => subscription.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={[styles.title, { color: theme.text }]}>settings screen</Text>
      <Button
        title={GetOSPlatform ? "sorry, this function is still under development!" : "Test Push notifications (Android only)"}
        onPress={schedulePushNotification}
        disabled={GetOSPlatform}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
scrollView: {
  flexGrow: 1,
  justifyContent: 'center',
},
title: {
  textAlign: 'center',
  fontSize: 50,
  padding: 10,
},
});