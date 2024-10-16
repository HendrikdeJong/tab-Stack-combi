import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import alertsData from '../../Custom/config/Alertlog.json';
import { useTheme } from '../../Custom/Theme';

export default function Alerts() {
  const theme = useTheme();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Load the alerts from JSON
    setAlerts(alertsData.alerts);
  }, []);

  const renderAlertItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { color: theme.text, flex: 1 }]}>{item.instance}</Text>
        <Text style={[styles.cell, { color: theme.text, flex: 3 }]}>{item.device}</Text>
        <Text style={[styles.cell, { color: theme.text, flex: 4 }]}>{item.description}</Text>
        <Text style={[styles.cell, { color: theme.text, flex: 2 }]}>{item.startTime}</Text>
        <Text style={[styles.cell, { color: item.status === 'Active' ? 'red' : theme.text, flex: 2}]}>
          {item.status === 'Active' ? 'Active' : item.duration}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={[styles.headerCell, { color: theme.text, flex: 1 }]}>Instance</Text>
        <Text style={[styles.headerCell, { color: theme.text, flex: 3 }]}>Device</Text>
        <Text style={[styles.headerCell, { color: theme.text, flex: 4 }]}>Description</Text>
        <Text style={[styles.headerCell, { color: theme.text, flex: 2 }]}>Alarm started at</Text>
        <Text style={[styles.headerCell, { color: theme.text, flex: 2 }]}>Alarm cleared after</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'nowrap',
  },
  cell: {
    fontSize: 14,
  },
});