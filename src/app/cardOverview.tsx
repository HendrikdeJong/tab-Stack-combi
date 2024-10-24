
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../Components/Theme';
import { useNavigation } from '@react-navigation/native';
import systemconfig from '../../DummyData/GatewayConfig.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// Overview Content Component
function OverviewContent() {
  const theme = useTheme();
  const { ID } = useLocalSearchParams<{ ID: string }>();
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    const section = systemconfig.system.devices.find((item: any) => item.ID === ID);
    if (section) {
      setDetails(section.details);
    }
  }, [ID]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {Object.keys(details).map((key, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.title, { color: theme.text, borderColor: theme.selected }]}>{key}</Text>
          {Array.isArray(details[key]) ? (
            details[key].map((item: any, idx: number) => (
              <View key={idx} style={styles.itemContainer}>
                <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
                <View style={styles.valueContainer}>
                  <Text style={[styles.value, { color: theme.text }]}>{item.value}</Text>
                  <Text style={[styles.unit, { color: theme.text }]}>{item.unit}</Text>
                </View>
              </View>
            ))
          ) : (
            Object.keys(details[key]).map((subKey, subIndex) => (
              <View key={subIndex}>
                {details[key][subKey].map((item: any, subIdx: number) => (
                  <View key={subIdx} style={styles.itemContainer}>
                    <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
                    <View style={styles.valueContainer}>
                      <Text style={[styles.value, { color: theme.text }]}>{item.value}</Text>
                      <Text style={[styles.unit, { color: theme.text }]}>{item.unit}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          )}
        </View>
      ))}
    </ScrollView>
  );
}

// Settings Screen Component
function SettingsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.screenContainer,{backgroundColor: theme.background}]}>
      <Text style={[styles.screenText,{color: theme.text}]}>Settings Screen</Text>
    </View>
  );
}

// Alerts Screen Component
function AlertsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.screenContainer,{backgroundColor: theme.background}]}>
      <Text style={[styles.screenText,{color: theme.text}]}>Alarms/Alerts Screen</Text>
    </View>
  );
}

// Main Component with Top Tab Navigator
export default function DevicesOverview() {
  const theme = useTheme();
  const { ID } = useLocalSearchParams<{ ID: string }>();
  const navigation = useNavigation();
  const [headerName, setHeaderName] = useState<string | null>(null);

  useEffect(() => {
    const section = systemconfig.system.devices.find((item: any) => item.ID === ID);
    if (section) {
      setHeaderName(section.title);
    }
  }, [ID]);

  useEffect(() => {
    if (headerName) {
      navigation.setOptions({
        headerTitle: headerName,
      });
    }
  }, [headerName, navigation]);

  return (
    <Tab.Navigator
      initialRouteName="OverviewContent"
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.whisperGreen },
        tabBarActiveTintColor: theme.whiteText,
        tabBarInactiveTintColor: theme.whiteText,
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: theme.text, height: 3 },
      }}>
      <Tab.Screen name="OverviewContent" component={OverviewContent} options={{ title: 'Overview' }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ title: 'Alerts' }} />
    </Tab.Navigator>
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
});