import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, router } from 'expo-router';
import { ThemeProvider, useTheme } from '../../../Styling/Theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import systemconfig from '../../../../DummyData/GatewayConfig.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {EmptyState} from '../../../Components/CustomFunctions';


import styles from '../../../Styling/StyleSheet';
import Device_Alarm_Page from './DeviceAlarms';
import Device_Information_Page from './DeviceMonitor';
import Device_Control_Page from './DeviceSettings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Tab = createMaterialTopTabNavigator();


export default function DevicesOverview() {
    const theme = useTheme();
    const { ID } = useGlobalSearchParams<{ ID: string }>();
    const MatchingDevice = systemconfig.system.devices.find((device) => device.ID === ID);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions(
            { title: MatchingDevice ? MatchingDevice.title : 'Device Overview' }
        );
    });

    if (!MatchingDevice) {
        return (
        <View style={[styles.CenterAlignmentContainer, { backgroundColor: useTheme().background }]}>
            <EmptyState message="No device found" BackButton={true} />
        </View>
        );
    }

    return (
        <Tab.Navigator
        initialRouteName="Device_Information_Page"
        screenOptions={{
            tabBarStyle: { backgroundColor: theme.whisperGreen },
            tabBarActiveTintColor: theme.whiteText,
            tabBarInactiveTintColor: theme.whiteText,
            tabBarLabelStyle: { fontWeight: 'bold', flexDirection: 'row', alignItems: 'center' },
            tabBarIndicatorStyle: { backgroundColor: theme.text, height: 3 },
        }}>
        <Tab.Screen
            name="Monitor"
            children={() => <Device_Information_Page Specifications={MatchingDevice.Specifications} />}
            options={{ 
            title: 'Monitor',
            tabBarLabel: ({ color }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='logo-html5' style={{ fontSize: 24, color, marginRight: 8 }}/>
                <Text style={{ color }}>Monitor</Text>
                </View>
            ),
            }}
        />
        <Tab.Screen
            name="Control"
            children={() => <Device_Control_Page Settings={MatchingDevice.Settings} />}
            options={{ 
            title: 'Control',
            tabBarLabel: ({ color }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='settings' style={{ fontSize: 24, color, marginRight: 8 }}/>
                <Text style={{ color }}>Control</Text>
                </View>
            ),
            }}
        />
        <Tab.Screen
            name="Alarm"
            children={() => <Device_Alarm_Page Devicejson={MatchingDevice} />}
            options={{ 
            title: 'Alarm',
            tabBarLabel: ({ color }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='warning' style={{ fontSize: 24, marginRight: 8, 
                    color: MatchingDevice.Alarms.length > 0 ? theme.notification : theme.text }}/>
                <Text style={{ color }}>Alarm</Text>
                </View>
            ),
            }}
        />
        </Tab.Navigator>
    );
}