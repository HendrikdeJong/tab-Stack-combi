import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../../../Styling/Theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import systemconfig from '../../../../DummyData/GatewayConfig.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {EmptyState, DetailItem} from './CustomFunctions';
import styles from '../../../Styling/StyleSheet';

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


  
export default function Device_Alarm_Page({ Alarms }: { Alarms: any }) {
    if (!Alarms || Alarms.length === 0) {
      return <EmptyState message="This device does not have any alerts" BackButton={false}/>;
    }
  
    return (
      <View style={[styles.CenterAlignmentContainer, { backgroundColor: useTheme().background }]}>
        <View style={[styles.ContentWrapper, { backgroundColor: useTheme().card }]}>
        {Alarms.map((Alarm: any, index: number) => (
          <DetailItem
            key={index}
            label={Alarm.description || Alarm.label}
            value={Alarm.value}
          />
        ))}
        </View>
      </View>
    );
  }