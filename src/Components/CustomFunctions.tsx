import { router } from "expo-router";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Modal, ActivityIndicator, Platform, TextInput } from "react-native";
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
  showAsFirstSetting: boolean;
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

export function EmptyState({ message, BackButton, surroundwithCard }: { message: string, BackButton: boolean, surroundwithCard: boolean }) {
  const theme = useTheme();
  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.background }]}>
      {surroundwithCard ? (
        <View style={[{backgroundColor: theme.card, padding: 20, borderRadius: 10}]}>
          <Text style={[styles.value, { color: theme.text }]}>{message}</Text>
          {BackButton && (
          <TouchableOpacity onPress={() => router.navigate('(drawer)')} style={styles.SettingButton}>
            <Ionicons name='arrow-back' style={{ fontSize: 24, color: theme.text}} />
            <Text style={[styles.value, { color: theme.text }]}>
              Go back
            </Text>
          </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={[styles.value, { color: theme.text }]}>{message}</Text>
      )}
      {BackButton && !surroundwithCard &&(
        <TouchableOpacity onPress={() => router.navigate('(drawer)')} style={styles.SettingButton}>
          <Ionicons name='arrow-back' style={{ fontSize: 24 }} />
          <Text style={[styles.value, { color: theme.text }]}>
            Go back
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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Search filtered alarms based on the search query
  const searchedData = useMemo(() => {
    if (!searchQuery) return filteredData;
    return filteredData.filter((alarm) =>
      alarm.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alarm.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredData, searchQuery]);

  // Sort searched alarms based on the current criteria
  const sortedData = useMemo(() => {
    const direction = sortCriteria.order === 'asc' ? 1 : -1;
    return [...searchedData].sort((a, b) => {
      switch (sortCriteria.key) {
        case 'deviceId':
          return direction * a.deviceId.localeCompare(b.deviceId);
        case 'priority':
          return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
        default:
          return 0;
      }
    });
  }, [searchedData, sortCriteria]);

  // Handle sorting button click
  const handleSortChange = useCallback((key: 'deviceId' | 'priority', order: 'asc' | 'desc') => {
    setSortCriteria({ key, order });
    setModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={[styles.headerContainer, { backgroundColor: theme.card, gap: 10 }]}>
        <Text style={[styles.headerText, { color: theme.text }]}>
          {filterDeviceId ? 'Device Alarms' : 'System Alarms'}
        </Text>
       
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.sortButton, { backgroundColor: theme.whisperGreen }]}
        >
          <Ionicons name="filter" size={24} color={theme.whiteText} />
          <Text style={[styles.headerText, { color: theme.whiteText }]}>Sort list</Text>
        </TouchableOpacity>
      </View>

      {/* OPTIONAL SEARCH FUNCTION
      <View style={[styles.sortButton, { backgroundColor: theme.whisperGreen, flex:1}]}>
        <Ionicons name="search" size={20} color={theme.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search alarms..."
          placeholderTextColor={theme.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View> */}

      {/* Alarms List */}
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => `${index}-${item.deviceId}-${item.description}`}
        renderItem={({ item }) => <AlarmItem alarm={item} HideName={!!filterDeviceId} />}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        ListFooterComponent={() => (
          loading ? (
            <View style={styles.loadingFooter}>
              <Text style={[styles.screenText, { color: theme.text }]}>Loading alarms</Text>
              <ActivityIndicator size="large" color={theme.text} />
            </View>
          ) : (
            <View style={styles.footerSpacer} />
          )
        )}
      />

      {modalVisible && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Sort Options</Text>
                <View style={styles.sortOptionContainer}>
                  <Text style={[styles.label, { color: theme.text }]}>Device ID</Text>
                  <View style={styles.sortButtonGroup}>
                    <TouchableOpacity
                      style={[styles.sortButtonOption, { backgroundColor: sortCriteria.key === 'deviceId' && sortCriteria.order === 'asc' ? theme.whisperGreen : theme.border }]}
                      onPress={() => handleSortChange('deviceId', 'asc')}
                    >
                      <Text style={[styles.sortButtonText, { color: theme.text }]}>Asc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.sortButtonOption, { backgroundColor: sortCriteria.key === 'deviceId' && sortCriteria.order === 'desc' ? theme.whisperGreen : theme.border }]}
                      onPress={() => handleSortChange('deviceId', 'desc')}
                    >
                      <Text style={[styles.sortButtonText, { color: theme.text }]}>Desc</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.sortOptionContainer}>
                  <Text style={[styles.label, { color: theme.text }]}>priority</Text>
                  <View style={styles.sortButtonGroup}>
                    <TouchableOpacity
                      style={[styles.sortButtonOption, { backgroundColor: sortCriteria.key === 'priority' && sortCriteria.order === 'asc' ? theme.whisperGreen : theme.border }]}
                      onPress={() => handleSortChange('priority', 'asc')}
                    >
                      <Text style={[styles.sortButtonText, { color: theme.text }]}>Asc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.sortButtonOption, { backgroundColor: sortCriteria.key === 'priority' && sortCriteria.order === 'desc' ? theme.whisperGreen : theme.border }]}
                      onPress={() => handleSortChange('priority', 'desc')}
                    >
                      <Text style={[styles.sortButtonText, { color: theme.text }]}>Desc</Text>
                    </TouchableOpacity>
                  </View>
              </View>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: theme.text }}>Close</Text>
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
    <View style={[styles.alarmCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Ionicons
        style={styles.alarmIcon}
        name={mapPriorityToIcon(alarm.priority).name as any}
        color={mapPriorityToIcon(alarm.priority).color}
      />
      <View style={styles.alarmInfoContainer}>
        {alarm.deviceName && !HideName && (
          <Text style={[styles.alarmDeviceName, { color: theme.text, borderColor: theme.selected }]}>{alarm.deviceName}</Text>
        )}
        <Text style={[styles.alarmDescription, { color: alarm.deviceName && !HideName ? theme.subtext : theme.text }]}>{alarm.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
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
  loadingFooter: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSpacer: {
    height: 20,
  },
  alarmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  alarmIcon: {
    fontSize: 40,
    marginRight: 10,
  },
  alarmInfoContainer: {
    flex: 1,
  },
  alarmDeviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alarmDescription: {
    fontSize: 20,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sortOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonOption: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 16,
    marginLeft: 2,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  SettingButton: {
    fontSize: 24,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
  },
  sortOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  });
