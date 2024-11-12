import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from '../Styling/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

// FOR TESTING PURPOSES WE WILL USE DUMMY DATA
// IN REAL WORLD SCENARIO, THIS DATA WILL BE FETCHED FROM BLUETOOTH OR WIFI
const DummyData = {
    "systems": [
        {
            "ID": "1",
            "systemName": "Gateway: Mets",
            "Pin": "0000",
        },
        {
            "ID": "2",
            "systemName": "DEMO Lib",
            "Pin": "0000",
        }
    ]
};

const saveToSecureStore = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
};

interface System {
    ID: string;
    systemName: string;
    Pin: string;
}

const SystemSelect = () => {
    const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
    const [pinInput, setPinInput] = useState('');
    const [isPinVisible, setIsPinVisible] = useState(false);

    const handlePress = (system: System) => {
        setSelectedSystem(system);
        setIsPinVisible(true);
    };

    const handlePinVerification = () => {
        if (selectedSystem && pinInput === selectedSystem.Pin) {
            saveToSecureStore('systemID', selectedSystem.ID);
            router.replace('(drawer)');
        } else {
            Alert.alert('Incorrect Pin', 'The Pin you entered is incorrect. Please try again.');
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <View style={styles.container}>
                    {DummyData.systems.map((system, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.selectablebutton, { backgroundColor: useTheme().card }]}
                        onPress={() => handlePress(system)}
                        >
                        <Text style={{ color: useTheme().text, fontSize: 24 }}>{system.systemName}</Text>
                        <Collapsible collapsed={selectedSystem?.ID !== system.ID} >
                            <View style={styles.pinContainer}>
                                <TextInput
                                    style={[styles.pinInput, {backgroundColor: useTheme().border ,color: useTheme().text }]}
                                    value={pinInput}
                                    onChangeText={setPinInput}
                                    placeholder="Enter Pin"
                                    placeholderTextColor={useTheme().text}
                                    keyboardType="numeric"
                                    secureTextEntry
                                />
                                <TouchableOpacity style={[styles.pinInput]} onPress={handlePinVerification}>
                                    <Ionicons name="checkmark" size={24} color={useTheme().text} />
                                </TouchableOpacity>
                            </View>
                        </Collapsible>
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
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pinInput: {
        borderRadius: 8,
        padding: 10,
        textAlign: 'center',
    },
});

export default SystemSelect;
