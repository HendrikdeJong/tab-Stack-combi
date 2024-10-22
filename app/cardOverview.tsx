import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../Custom/Theme';
import { useNavigation } from '@react-navigation/native';
import systemconfig from '../Custom/config/GatewayConfig.json';

export default function Overview () {
  const theme = useTheme();
  const { ID } = useLocalSearchParams<{ ID: string }>();
  const navigation = useNavigation();
  const [headerName, setHeaderName] = useState<string | null>(null);
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    const section = systemconfig.system.devices.find((item: any) => item.ID === ID);
    if (section) {
      setHeaderName(section.title);
      setDetails(section.details);
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
                      <Text style={[styles.value, { color: theme.text }]}>{item.value}</Text><Text style={[styles.unit, { color: theme.text }]}>{item.unit}</Text>
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
});

