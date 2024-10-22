import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useTheme } from '../../Custom/Theme';

const Alertsjson = [
  { instance: '512', device: 'Battery Monitor', description: 'Low voltage alarm', alarmStartedAt: '2024-06-05 07:42:03', alarmClearedAfter: 'Active', severity: 'high' },
  { instance: '513', device: 'Solar Panel', description: 'Overheating', alarmStartedAt: '2024-06-05 08:42:03', alarmClearedAfter: '2024-06-05 09:10:00', severity: 'medium' },
  { instance: '514', device: 'Inverter', description: 'Short Circuit', alarmStartedAt: '2024-06-05 09:00:00', alarmClearedAfter: 'Active', severity: 'high' },
  { instance: '515', device: 'Battery Monitor', description: 'High voltage alarm', alarmStartedAt: '2024-06-04 12:00:00', alarmClearedAfter: '2024-06-04 12:30:00', severity: 'medium' },
  { instance: '516', device: 'Generator', description: 'Fuel Low', alarmStartedAt: '2024-06-03 10:00:00', alarmClearedAfter: '2024-06-03 11:15:00', severity: 'low' },
];

const Alerts = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({});
  const [sortCriteria, setSortCriteria] = useState('Newest');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const toggleExpand = (instance) => {
    setExpanded((prev) => ({ ...prev, [instance]: !prev[instance] }));
  };

  const calculateTimeAgo = (time) => {
    if (time === 'Active') return `Active since ${new Date().toLocaleDateString()}`;
    const diffHours = Math.abs(new Date() - new Date(time)) / 36e5;
    return diffHours >= 24 ? `${Math.floor(diffHours / 24)} day(s) ago` : `${Math.round(diffHours)} hour(s) ago`;
  };

  const getBackgroundColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return theme.card;
    }
  };

  const sortedData = Alertsjson.sort((a, b) => {
    switch (sortCriteria) {
      case 'Newest':
        return new Date(b.alarmStartedAt) - new Date(a.alarmStartedAt);
      case 'Oldest':
        return new Date(a.alarmStartedAt) - new Date(b.alarmStartedAt);
      case 'Device':
        return a.device.localeCompare(b.device);
      default:
        return 0;
    }
  });

  const renderHeader = () => (
    <View>
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>      
        <Text style={[styles.headerText, { color: theme.text }]}>Alerts</Text>
        <TouchableOpacity style={styles.sortSelector} onPress={() => setSortMenuVisible(!sortMenuVisible)}>
          <Text style={{ color: theme.text, fontSize: 14 }}>Sort: {sortCriteria}</Text>
        </TouchableOpacity>
      </View>
      <Collapsible collapsed={!sortMenuVisible} style={[styles.sortMenu, { backgroundColor: theme.card }]}>
        {['Newest', 'Oldest', 'Device'].map((criteria) => (
          <TouchableOpacity
            key={criteria}
            style={[styles.sortOption, { backgroundColor: sortCriteria === criteria ? theme.whisperGreen : theme.border }]}
            onPress={() => { setSortCriteria(criteria); setSortMenuVisible(false); }}
          >
            <Text style={[styles.sortOptionText, { color: theme.text }]}>{criteria}</Text>
          </TouchableOpacity>
        ))}
      </Collapsible>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>      
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.instance}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={[styles.alertCard, { backgroundColor: getBackgroundColor(item.severity) }]}>            
            <TouchableOpacity onPress={() => toggleExpand(item.instance)} style={styles.alertHeader}>              
              <View style={styles.alertItem}>              
                <Text style={[styles.alertText, { color: theme.text }]}>{item.device}</Text>
                <Text style={[styles.alertText, { color: theme.text }]}>{item.description}</Text>
                <Text style={[styles.alertText, { color: theme.text, textAlign: 'right' }]}>{calculateTimeAgo(item.alarmClearedAfter)}</Text>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={!expanded[item.instance]} style={{ backgroundColor: theme.border }}>
              <View style={styles.expandedItem}>                
                <Text style={[styles.expandedText, { color: theme.text }]}>Started at: {item.alarmStartedAt}</Text>
                <Text style={[styles.expandedText, { color: theme.text }]}>Cleared after: {item.alarmClearedAfter}</Text>
              </View>
            </Collapsible>
          </View>
        )}
      />
    </View>
  );
};

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortMenu: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'column',
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  sortOptionText: {
    fontSize: 14,
  },
  alertCard: {
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  alertHeader: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  alertText: {
    fontSize: 14,
    flex: 1,
  },
  expandedItem: {
    padding: 10,
  },
  expandedText: {
    fontSize: 13,
    marginBottom: 3,
  },
});

export default Alerts;
