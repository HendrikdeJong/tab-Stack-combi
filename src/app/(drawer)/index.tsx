import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../Components/Theme';
import { useEffect, useState } from 'react';
import systemconfig from '../../../DummyData/GatewayConfig.json';
import ComponentCard from '../../Components/ComponentCard';


export default function GatewayLocal() {
  const theme = useTheme();
  const devices = systemconfig.system.devices;
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {devices.map((device) => (
          <ComponentCard key={device.ID} ID={device.ID} />
        ))}
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