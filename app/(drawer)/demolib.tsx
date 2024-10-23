import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ComponentCard from '../../Custom/ComponentCard';
import { useTheme } from '../../Custom/Theme';
import systemconfig from '../../Custom/GatewayConfig.json';
import { useEffect, useState } from 'react';

export default function demolib() {
  const theme = useTheme();
  const devices = systemconfig.system.devices;
  return (
    <ScrollView contentContainerStyle={[styles.scrollView, ]}>
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