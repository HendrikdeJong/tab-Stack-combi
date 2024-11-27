import { StyleSheet, FlatList, useWindowDimensions, ScrollView, View, ActivityIndicator, Text, Button, RefreshControl } from 'react-native';
import ComponentCard from '../../Components/ComponentCard';
import {useFetchConfig} from '../../Components/CustomFunctions'
import { useState } from 'react';
import { useTheme } from '../../Styling/Theme';
import React from 'react';

export default function GatewayLocal() {
  const { width } = useWindowDimensions();
  const { loading, config, error } = useFetchConfig();
  const devices = config?.system?.devices ?? [];
  
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


  return (
    <FlatList
      data={devices}
      key={numColumns}
      keyExtractor={(item) => item.ID}
      renderItem={({ item }) => <ComponentCard ID={item.ID} collapsible={numColumns === 1}/>}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
      contentContainerStyle={{marginHorizontal: width > 350 ? 16 : 0, marginVertical: 16}}
      ItemSeparatorComponent={() => <View style={{height: 16}} />}
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
    backgroundColor: '#EF5350',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-evenly',
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    padding: 10,
  },
});