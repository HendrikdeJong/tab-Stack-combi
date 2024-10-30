import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemeProvider, useTheme } from '../../../Styling/Theme';
import { EmptyState, AlarmItem, AlarmsList } from '../../../Components/CustomFunctions';
import styles from '../../../Styling/StyleSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Device_Alarm_Page({ Devicejson }: { Devicejson: any }) {
  if (!Devicejson.Alarms || Devicejson.Alarms.length === 0) {
    return <EmptyState message="This device does not have any alerts" BackButton={false} />;
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: useTheme().background }}>
        <AlarmsList filterDeviceId={Devicejson.ID} />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}