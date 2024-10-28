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



export default function Device_Information_Page({ Specifications }: { Specifications: any }) {
    const theme = useTheme();
  
    if (!Specifications || Object.keys(Specifications).length === 0) {
      return <EmptyState message="This device does not support / have any specifications" BackButton={false} />;
    }
  
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {Object.keys(Specifications).map((key, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.title, { color: theme.text, borderColor: theme.selected }]}>{key}</Text>
            {Specifications[key].map((item: any, idx: number) => (
              <DetailItem key={idx} label={item.label} value={item.value} unit={item.unit} />
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }