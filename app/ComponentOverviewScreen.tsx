import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import deviceConfig from '../Custom/config/device.json'; // Static for now
import dataUpdates from '../Custom/config/data.json'; // Static for now
import { useTheme } from '../Custom/Theme';

const ComponentOverviewScreen = () => {
  const theme = useTheme();
  const { deviceId } = useLocalSearchParams();
  const device = deviceConfig.devices.find(d => d.id === deviceId);
  const realTimeData = dataUpdates.updates.find(data => data.deviceId === deviceId)?.data || {};

  const renderSectionContent = (section) => {
    return section.dataConfig.map((field, index) => (
      <Text key={index} style={[styles.text, { color: theme.text }]}>
        {field.label}: {realTimeData[field.dataType] || 'N/A'}
      </Text>
    ));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Text style={[styles.title, { color: theme.text }]}>{device.name} - Info</Text>

      {/* Render each section (e.g., Summary, DC Connections) */}
      {device.infoConfig.tabs.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          {/* Section Header */}
          <Text style={[styles.sectionHeader, { color: theme.text }]}>{section.name}</Text>
          {/* Separator */}
          <View style={[styles.separator, { borderBottomColor: theme.text }]} />
          {/* Section Content */}
          {renderSectionContent(section)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default ComponentOverviewScreen;
