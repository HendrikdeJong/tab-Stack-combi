import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../Styling/Theme';
import gatewayConfig from '../../../DummyData/GatewayConfig.json';

type Alarm = {
  priority: 'critical' | 'warning' | 'information';
  description: string;
  deviceTitle: string;
};

const alarms: Alarm[] = gatewayConfig.system.devices.flatMap(device => 
  device.Alarms.map(alarm => ({
    ...alarm,
    priority: alarm.priority as 'critical' | 'warning' | 'information',
    deviceTitle: device.title
  }))
);

const priorityOrder = { critical: 1, warning: 2, information: 3 };

export default function Alerts() {
  const theme = useTheme();
  const [sortCriteria, setSortCriteria] = useState<'deviceTitle' | 'priority'>('priority');
  const [sortedData, setSortedData] = useState<Alarm[]>([]);

  useEffect(() => {
    const sorted = [...alarms].sort((a, b) => {
      switch (sortCriteria) {
        case 'deviceTitle':
          return a.deviceTitle.localeCompare(b.deviceTitle);
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return 0;
      }
    });
    setSortedData(sorted);
  }, [sortCriteria]);

  const mapPriorityToIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return { name: 'warning', color: 'red' };
      case 'warning':
        return { name: 'warning', color: 'orange' };
      case 'information':
        return { name: 'information-circle', color: 'lightblue' };
      default:
        return { name: 'information-circle', color: 'lightblue' };
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>      
        {/* <Text style={[styles.headerText, { color: theme.text }]}></Text> */}
        <View style={styles.sortSelector}>
          <Text style={[styles.headerText, { color: theme.text }]}>Sort by: </Text>
          {['device', 'priority'].map((criteria) => (
            <TouchableOpacity 
              key={criteria} 
              style={[styles.sortOption, { backgroundColor: sortCriteria === criteria ? theme.whisperGreen : theme.border }]} 
              onPress={() => setSortCriteria(criteria as 'deviceTitle' | 'priority')}
            >
              <Text style={[styles.headerText, { color: theme.text }]}>{criteria}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* LIST */}
      <FlatList 
        data={sortedData} 
        keyExtractor={(item) => `${item.deviceTitle}-${item.description}`} 
        renderItem={({ item }) => (
          <View style={[styles.listitemContainer, { backgroundColor: theme.border }]}>
            <View style={styles.ItemContainer}>
              
              <Text style={[styles.alertText, { color: theme.text }]}><Ionicons style={styles.alertIcon} name={mapPriorityToIcon(item.priority).name as any} color={mapPriorityToIcon(item.priority).color}/>{item.deviceTitle}: {item.description}</Text>
              {/* <Text style={[styles.alertText, { color: theme.text }]}>{item.deviceTitle}</Text>
              <Text style={[styles.alertText, { color: theme.text }]}>{item.description}</Text> */}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortMenu: {
    padding: 10,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  sortOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  listitemContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    flex: 1,
  },
  alertIcon: {
    fontSize: 20,
    marginRight: 5,
    textAlignVertical: 'center',
  },
  expandedItem: {
    padding: 10,
  },
  expandedText: {
    fontSize: 13,
    marginBottom: 3,
  },
});