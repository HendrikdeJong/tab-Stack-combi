import { StyleSheet, FlatList, useWindowDimensions, ScrollView, View, ActivityIndicator, Text, Button } from 'react-native';
import ComponentCard from '../../Components/ComponentCard';
import {useFetchConfig} from '../../Components/CustomFunctions'
import { useState } from 'react';
import { useTheme } from '../../Styling/Theme';

export default function GatewayLocal() {
  const { width } = useWindowDimensions();
  const { loading, config, error } = useFetchConfig();
  
  const getNumColumns = () => {
    if (width > 1200) return 3;
    if (width > 700) return 2;
    return 1;                   
  };
  const numColumns = getNumColumns();

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={useTheme().whisperGreen} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => window.location.reload()} />
      </View>
    );
  }

  const devices = config?.system?.devices ?? [];

  return (
    <FlatList
      data={devices}
      key={numColumns}
      keyExtractor={(item) => item.ID}
      renderItem={({ item }) => <ComponentCard ID={item.ID} />}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    padding: 10,
  },
});