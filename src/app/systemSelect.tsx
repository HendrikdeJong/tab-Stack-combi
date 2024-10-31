import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';


// FOR TESTING PURPOSES WE WILL USE DUMMY DATA
// IN REAL WORLD SCENARIO, THIS DATA WILL BE FETCHED FROM BLUETOOTH OR WIFI
const DummyData = {
    "systems": [
        {
            "systemName": "Gateway: Mets",
            "url": "/GatewayConfig.json"
        },
        {
            "systemName": "Gateway: Example",
            "url": "/GatewayConfig copy.json"
        }
    ]
};

const saveToSecureStore = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
};

const SystemSelect = () => {
    const handlePress = (systemName: string, url: string) => {
        console.log(`Selected system: ${systemName}, URL: ${url}`);
        saveToSecureStore('selectedSystem', url);
        router.replace('(drawer)');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {DummyData.systems.map((system, index) => (
                <Button
                    key={index}
                    title={system.systemName}
                    onPress={() => handlePress(system.systemName, system.url)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default SystemSelect;
