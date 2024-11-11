import { View, Text, ScrollView, StyleSheet, Button, Platform } from 'react-native';
import { useTheme } from '../../Styling/Theme';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { router, useNavigation } from 'expo-router';

var activeAlarms = 0;

function renderNotificationContent() {
  activeAlarms += 1;
  if(activeAlarms > 3){
    activeAlarms = 0;
  }
  if (activeAlarms <= 1) {
    return {
      title: "Device: piccolo 6 needs attention!",
      body: "alarm: high exhaust temperature",
      data: { screen: "Alarms" },
    };
  } else {
    return {
      title: "Multiple devices needs attention!",
      body: `Device: piccolo 6, Alarms: ${activeAlarms}`,
      data: { screen: "Alarms" },
    };
  }
}

async function schedulePushNotification() {
  await Notifications.dismissAllNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: renderNotificationContent(),
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
      if (screen != null) {
        router.replace(screen);
      }
    });

    return () => subscription.remove();
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={[styles.title, { color: theme.text }]}>settings screen under development</Text>
      {/* <Button title={GetOSPlatform ? "sorry, this function is still under development!" : "Test Push notifications"}
        onPress={schedulePushNotification}
        disabled={GetOSPlatform}
      /> */}
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