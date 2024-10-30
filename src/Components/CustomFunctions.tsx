import { router } from "expo-router";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Modal } from "react-native";
import { useTheme } from "../Styling/Theme";
import { Ionicons } from '@expo/vector-icons';
import gatewayConfig from "../../DummyData/GatewayConfig.json";

export function EmptyState({ message, BackButton }: { message: string, BackButton: boolean }) {
  const theme = useTheme();
  return (
    <View style={[styles.CenterAlignmentContainer, { backgroundColor: theme.background }]}>
      <View style={styles.screenContainer}>
        <Text style={[styles.screenText, { color: theme.text }]}>{message}</Text>
        {BackButton && (
          <TouchableOpacity onPress={() => router.navigate('./')} style={styles.SettingButton}>
            <Text style={[styles.screenText, { color: theme.text }]}>
              <Ionicons name='arrow-back' style={{ fontSize: 24 }} />Go back
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function DetailItem({ label, value, unit }: { label: string; value?: string; unit?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <View style={styles.valueContainer}>
        {value && <Text style={[styles.value, { color: theme.text }]}>{value}</Text>}
        {unit && <Text style={[styles.unit, { color: theme.text }]}>{unit}</Text>}
      </View>
    </View>
  );
}


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

export function AlarmsList({ alarms, filterDeviceId }: { alarms?: any[]; filterDeviceId?: string }) {
  const theme = useTheme();
  const [sortCriteria, setSortCriteria] = useState<{ key: 'deviceId' | 'priority'; order: 'asc' | 'desc' }>({ key: 'priority', order: 'asc' });
  const [modalVisible, setModalVisible] = useState(false);

  const priorityOrder: { [key: string]: number } = { critical: 1, warning: 2, information: 3 };

  // Use alarms from the configuration JSON if no alarms are passed
  const allAlarms = alarms || useMemo(() => {
    return gatewayConfig.system.devices.flatMap(device =>
      device.Alarms.map(alarm => ({
        ...alarm,
        priority: alarm.priority as 'critical' | 'warning' | 'information',
        deviceId: device.ID,
        deviceName: device.title
      }))
    );
  }, [alarms]);

  // Filtered alarms based on the device ID
  const filteredData = useMemo(() => {
    return filterDeviceId ? allAlarms.filter(alarm => alarm.deviceId === filterDeviceId) : allAlarms;
  }, [allAlarms, filterDeviceId]);

  // Sort filtered alarms based on the current criteria
  const sortedData = useMemo(() => {
    const direction = sortCriteria.order === 'asc' ? 1 : -1;
    return [...filteredData].sort((a, b) => {
      switch (sortCriteria.key) {
        case 'deviceId':
          return direction * a.deviceId.localeCompare(b.deviceId);
        case 'priority':
          return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
        default:
          return 0;
      }
    });
  }, [filteredData, sortCriteria]);

  // Handle sorting button click
  const handleSortChange = useCallback((key: 'deviceId' | 'priority', order: 'asc' | 'desc') => {
    setSortCriteria({ key, order });
    setModalVisible(false);
  }, []);

  return (
    <View style={{}}>
      {/* Header Section */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.headerText, { color: theme.text }]}>Alarms</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]}>
          <Ionicons name="filter" size={24} color={theme.text} />
          <Text style={[styles.headerText, { color: theme.text }]}>Sort/Filter</Text>
        </TouchableOpacity>
      </View>

    

      {/* Alarms List */}
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => `${index}-${item.deviceId}-${item.description}`}
        renderItem={({ item }) => <AlarmItem alarm={item} />}
        initialNumToRender={10} // Optimize by rendering a limited number of items initially
        maxToRenderPerBatch={10}
        windowSize={5}
        // ItemSeparatorComponent={() => <View style={{ borderWidth: 1, width: "80%", alignSelf:"center"}} />}
        ListFooterComponent={() => <View style={{ height: 10, backgroundColor: theme.border, borderBottomStartRadius: 8, borderBottomEndRadius: 8 }} />}
      />
        {/* Modal for Sort Options */}
        {modalVisible && (
        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Sort Options</Text>
              <Text style={[styles.label, { color: theme.text }]}>Device ID</Text>
              <View style={{flexDirection: "row", gap: 5}}>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]} onPress={() => handleSortChange('deviceId', 'asc')}>
                  <Text style={{ color: theme.text }}>Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]} onPress={() => handleSortChange('deviceId', 'desc')}>
                  <Text style={{ color: theme.text }}>Descending</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.label, { color: theme.text }]}>Priority</Text>
              <View style={{flexDirection: "row", gap: 5}}>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]} onPress={() => handleSortChange('priority', 'asc')}>
                  <Text style={{ color: theme.text }}>Ascending</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]} onPress={() => handleSortChange('priority', 'desc')}>
                  <Text style={{ color: theme.text }}>Descending</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={[styles.modalButton, { marginTop: 10 }]} onPress={() => setModalVisible(false)}>
                <Text style={{ color: theme.text }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export function AlarmItem({ alarm }: { alarm: any }) {
  const theme = useTheme();
  return (
    <View style={{padding: 10, backgroundColor: theme.border }}>
      <View style={{ flexDirection: "row" }}>
        <Ionicons style={styles.alertIcon} name={mapPriorityToIcon(alarm.priority).name as any} color={mapPriorityToIcon(alarm.priority).color} />
        <Text style={{ color: theme.text }}>
          {alarm.deviceId ? `${alarm.deviceName}: ` : ''}
          {alarm.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    label: {
      fontSize: 20,
    },
    valueContainer: {
      flexDirection: 'row',
    },
    value: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    unit: {
      fontSize: 16,
      alignSelf: 'flex-end',
      marginLeft: 2,
      fontWeight: 'bold',
    },
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    screenText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
    CenterAlignmentContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    ContentWrapper: {
      height: '90%',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
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
    sortOption: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    SettingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    SettingButton: {
      fontSize: 24,
      padding: 10,
      borderRadius: 5,
    },
    SettingsModalButton: {
      marginHorizontal: 10,
      flexDirection: 'row',
      padding: 8,
      borderRadius: 8,
      textAlign: 'center',
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
      width: '80%',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 5,
    },
});
