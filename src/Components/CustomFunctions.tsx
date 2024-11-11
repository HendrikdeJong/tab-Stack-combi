import { router } from "expo-router";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Modal, ActivityIndicator, Platform } from "react-native";
import { useTheme } from "../Styling/Theme";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Alarm = {
  priority: 'critical' | 'warning' | 'information';
  description: string;
};

type ButtonOption = {
  name: string;
  value: string;
};

type Setting = {
  label: string;
  settingtype: string;
  value: string;
  minvalue?: string;
  maxvalue?: string;
  unit?: string;
  buttons?: ButtonOption[];
};

type SpecificationDetail = {
  label: string;
  value: string;
  unit?: string;
};

type Specifications = {
  summary: Record<string, SpecificationDetail[]>[];
};

type Device = {
  ID: string;
  title: string;
  class: string;
  classIcon: string;
  iconlib: string;
  status: string;
  Alarms: Alarm[];
  Settings: Setting[];
  Specifications: Specifications;
};

type SystemConfig = {
  system: {
    devices: Device[];
    name: string;
  };
};

async function getValueFor(key: string) {
  let result = await AsyncStorage.getItem(key);
  if (result) {
    return result;
  } else {
    // console.error('Error getting value, using default value for', key);
    return "1";
  }
}

export function useFetchConfig() {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
        try {
          let systemidvalue= getValueFor('systemID');
          await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
          if (await systemidvalue === "1") {
            const systemconfig: SystemConfig = require('../../DummyData/GatewayConfig.json');
            setConfig(systemconfig);
          } else {
            const systemconfig: SystemConfig = require('../../DummyData/DemoLib.json');
            setConfig(systemconfig);
          }
  
          // console.log('Fetched configuration:', systemconfig);
        } catch (error) {
          console.error('Failed to fetch configuration:', error);
          setError('Failed to load configuration. Please try again later.');
        } finally {
          setLoading(false);
        }
    };
    fetchConfig();
  }, []);

  return { loading, config, error };
}

export function LoadingState({ message } : { message: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      <Text style={[styles.screenText, { color: theme.text }]}>Loading {message}</Text>
      <ActivityIndicator size="large" color={theme.text} />
    </View>
  );
}

export function EmptyState({ message, BackButton }: { message: string, BackButton: boolean }) {
  const theme = useTheme();
  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.value, { color: theme.text }]}>{message}</Text>
        {BackButton && (
          <TouchableOpacity onPress={() => router.navigate('./')} style={styles.SettingButton}>
            <Text style={[styles.value, { color: theme.text }]}>
              <Ionicons name='arrow-back' style={{ fontSize: 24 }} />Go back
            </Text>
          </TouchableOpacity>
        )}
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
  const { loading, config, error } = useFetchConfig(); // Use the custom hook to get loading, config, and error state
  const [sortCriteria, setSortCriteria] = useState<{ key: 'deviceId' | 'priority'; order: 'asc' | 'desc' }>({ key: 'priority', order: 'asc' });
  const [modalVisible, setModalVisible] = useState(false);

  const priorityOrder: { [key: string]: number } = { critical: 1, warning: 2, information: 3 };

  // Use alarms from the configuration JSON if no alarms are passed
  const allAlarms = useMemo(() => {
    if (alarms) {
      return alarms;
    }

    if (loading || error || !config) {
      return []; // Return empty array if loading, error, or no config
    }

    // If no alarms are passed, use alarms from the fetched config
    return config.system.devices.flatMap((device) =>
      device.Alarms.map((alarm: any) => ({
        ...alarm,
        priority: alarm.priority as 'critical' | 'warning' | 'information',
        deviceId: device.ID,
        deviceName: device.title,
      }))
    );
  }, [alarms, loading, error, config]);

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
          <Ionicons name="filter" size={24} color={theme.whiteText} />
          <Text style={[styles.headerText, { color: theme.whiteText }]}>Sort/Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Alarms List with Loading Footer */}
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => `${index}-${item.deviceId}-${item.description}`}
        renderItem={({ item }) => <AlarmItem alarm={item} HideName={!!filterDeviceId} />}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        ListFooterComponent={() => (
          loading ? (
            <View style={{padding: 10,flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.border}}>
              <Text style={[styles.screenText, { color: theme.text }]}>Loading alarms</Text>
              <ActivityIndicator size="large" color={theme.text} />
            </View>
          ) : (
            <View style={{ height: 10, borderBottomStartRadius: 8, borderBottomEndRadius: 8, backgroundColor: theme.border}} />
          )
        )}
      />
        {/* Modal for Sort Options */}
        {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor: theme.card, }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Sort Options</Text>
              <View style={{flexDirection: "row", gap: 5, alignItems: "center", justifyContent: 'center'}}>
                <Text style={[styles.label, { color: theme.text }]}>Device ID</Text>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: sortCriteria.key ==='deviceId' && sortCriteria.order === 'asc' ? theme.whisperGreen : theme.border}]} onPress={() => handleSortChange('deviceId', 'asc')}>
                  <Text style={{ color: sortCriteria.key ==='deviceId' && sortCriteria.order === 'asc' ? theme.whiteText : theme.text }}>Ascending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: sortCriteria.key ==='deviceId' && sortCriteria.order === 'desc' ? theme.whisperGreen : theme.border }]} onPress={() => handleSortChange('deviceId', 'desc')}>
                  <Text style={{ color: sortCriteria.key ==='deviceId' && sortCriteria.order === 'desc' ? theme.whiteText : theme.text }}>Descending</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", gap: 5, alignItems: "center", justifyContent: 'center'}}>
                <Text style={[styles.label, { color: theme.text }]}>Priority</Text>
                <TouchableOpacity style={[styles.sortButton, { backgroundColor: sortCriteria.key ==='priority' && sortCriteria.order === 'asc' ? theme.whisperGreen : theme.border }]} onPress={() => handleSortChange('priority', 'asc')}>
                  <Text style={{ color: sortCriteria.key ==='priority' && sortCriteria.order === 'asc' ? theme.whiteText : theme.text }}>Ascending</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.sortButton, { backgroundColor: sortCriteria.key ==='priority' && sortCriteria.order === 'desc' ? theme.whisperGreen : theme.border }]} onPress={() => handleSortChange('priority', 'desc')}>
                  <Text style={{ color: sortCriteria.key ==='priority' && sortCriteria.order === 'desc' ? theme.whiteText : theme.text }}>Descending</Text>
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

export function AlarmItem({ alarm, HideName }: { alarm: any, HideName?: boolean }) {
  const theme = useTheme();
  return (
    <View style={{padding: 10, backgroundColor: theme.border }}>
      <View style={{ flexDirection: "row", alignItems: 'center'}}>
        <Ionicons style={[styles.alertIcon, {fontSize: 30,}]} name={mapPriorityToIcon(alarm.priority).name as any} color={mapPriorityToIcon(alarm.priority).color} />
        <Text style={{fontSize: 15, color: theme.text }}>
          {!HideName && alarm.deviceId ? `${alarm.deviceName}: ` : ''}
          {alarm.description}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 20,
    marginRight: 10,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
    marginLeft: 2,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
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
    padding: 20,
    borderRadius: 10,
    gap: 10,
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