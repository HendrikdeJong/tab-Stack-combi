import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '../Styling/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// FOR TESTING PURPOSES WE WILL USE DUMMY DATA
// IN REAL WORLD SCENARIO, THIS DATA WILL BE FETCHED FROM BLUETOOTH OR WIFI
const DummyData = {
    "systems": [
        {
            "ID": "1",
            "systemName": "Gateway: Mets",
        },
        {
            "ID": "2",
            "systemName": "DEMO Lib",
        }
    ]
};

const saveToSecureStore = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
};

const SystemSelect = () => {
    const handlePress = (systemName: string, ID: string) => {
        // console.log(`Selected system: ${systemName}, URL: ${url}`);
        saveToSecureStore('systemID', ID);
        router.replace('(drawer)');
    };

    return (
         <GestureHandlerRootView style={{flex: 1,}}>
         <ThemeProvider>
            <View style={styles.container}>
            {DummyData.systems.map((system, index) => (
                <TouchableOpacity key={index} style={[styles.selectablebutton, {backgroundColor: useTheme().card}]} onPress={() => handlePress(system.systemName, system.ID)}>
                    <Text style={{color: useTheme().text, fontSize: 24}}>{system.systemName}</Text>
                </TouchableOpacity>
            ))}
            </View>
         </ThemeProvider>
       </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    selectablebutton: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        width: '80%',
        alignItems: 'center',
    }
});

export default SystemSelect;
