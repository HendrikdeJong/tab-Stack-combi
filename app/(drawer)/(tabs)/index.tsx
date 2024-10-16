import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import DynamicCard from '../../../Custom/DynamicCard';
import { useTheme } from '../../../Custom/Theme';
import system from '../../../Custom/config/System.json';
import deviceConfig from '../../../Custom/config/device.json';
import dataUpdates from '../../../Custom/config/data.json';
import { useEffect, useState } from 'react';

export default function GatewayLocal() {
  const [devices, setDevices] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Combine device configuration with real-time data from data.json
    const combinedData = deviceConfig.devices.map(device => {
      const realTimeData = dataUpdates.updates.find(data => data.deviceId === device.id);
      return {
        ...device,
        data: realTimeData ? realTimeData.data : {}
      };
    });
    setDevices(combinedData);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {devices.map((device, index) => (
        <DynamicCard key={index} data={device} />
      ))}
    </ScrollView>
  );
}