import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../Custom/Theme';

type Priority = 'critical' | 'warning' | 'information';
const priorityOrder = { 'critical': 1, 'warning': 2, 'information': 3 };

const Alertsjson: { instance: string; priority: Priority; device: string; description: string; }[] = [
  { instance: '512', priority: 'critical' ,  device: 'Battery Monitor',description: 'Low voltage'},
  { instance: '515', priority: 'warning',    device: 'Battery Monitor',description: 'High voltage'},
  { instance: '513', priority: 'warning',    device: 'Solar Panel',    description: 'Overheating'},
  { instance: '514', priority: 'critical',   device: 'Inverter',       description: 'Short Circuit'},
  { instance: '516', priority: 'information',device: 'Generator',      description: 'Fuel Low'},
];

export default function Alerts(){
  const theme = useTheme();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [sortCriteria, setSortCriteria] = useState('priority');


  const toggleExpand = (instance: string) => {
    setExpanded((prev) => ({ ...prev, [instance]: !prev[instance] }));
  };

  const mapPriorityToIcon = (priority: Priority) => {
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



  const sortedData = Alertsjson.sort((a, b) => {
    switch (sortCriteria) {
      case 'Device':
        return a.device.localeCompare(b.device);
      case 'priority':
        return priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority];
      default:
        return 0;
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>      
        <Text style={[styles.headerText, { color: theme.text }]}>Gateway alert list</Text> 
        <Text style={[styles.headerText, { color: theme.text,}]}>Sort by: {['Device', 'priority'].map((criteria) => ( 
          <TouchableOpacity key={criteria} style={[styles.sortOption, { backgroundColor: sortCriteria === criteria ? theme.whisperGreen : theme.border }]} 
            onPress={() => { setSortCriteria(criteria)}}>
            <Text style={[styles.headerText, { color: theme.text }]}>{criteria}</Text>
          </TouchableOpacity>
          ))}
        </Text>
      </View>
      {/* LIST */}
      <FlatList data={sortedData} keyExtractor={(item) => item.instance} renderItem={({ item }) => (
          <View style={[styles.listitemContainer, { backgroundColor: theme.border }]}>
            {/* <TouchableOpacity onPress={() => toggleExpand(item.instance)} style={styles.listitemContainer}>               */}
                <View style={styles.alertItem}>
                  <Ionicons style={styles.alertIcon} name={mapPriorityToIcon(item.priority).name as any} color={mapPriorityToIcon(item.priority).color} />
                  <Text style={[styles.alertText, { color: theme.text }]}>{item.device}</Text>
                  <Text style={[styles.alertText, { color: theme.text }]}>{item.description}</Text>
                  {/* <TouchableOpacity onPress={() => toggleExpand(item.instance)} style={{}}><Ionicons style={styles.alertIcon} name={"menu"}/></TouchableOpacity> */}
                </View>
            {/* </TouchableOpacity> */}
            {/* <Collapsible collapsed={!expanded[item.instance]} style={{ backgroundColor: theme.border }}>
              <View style={styles.expandedItem}>                
                <Text style={[styles.expandedText, { color: theme.text }]}>Started at:</Text>
              </View>
            </Collapsible> */}
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
  alertItem: {
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
  },
  expandedItem: {
    padding: 10,
  },
  expandedText: {
    fontSize: 13,
    marginBottom: 3,
  },
});