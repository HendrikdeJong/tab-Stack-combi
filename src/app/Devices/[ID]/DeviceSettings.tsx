import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams, router } from 'expo-router';
import { useTheme } from '../../../Styling/Theme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import systemconfig from '../../../../DummyData/GatewayConfig.json';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from '../../../Styling/StyleSheet';
function EmptyState({ message, BackButton }: { message: string, BackButton: boolean }) {
    const theme = useTheme();
    return (
      <View style={[styles.CenterAlignmentContainer, { backgroundColor: theme.background }]}>
        <View style={styles.screenContainer}>
          <Text style={[styles.screenText, { color: theme.text }]}>{message}</Text>
          {BackButton == true && (
             <TouchableOpacity onPress={() => router.navigate('./')} style={styles.SettingButton}>
                <Text style={[styles.screenText, { color: theme.text }]}><Ionicons name='arrow-back' style={{fontSize: 24}}/>Go back</Text>
             </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

export default function Device_Control_Page({ Settings }: { Settings: any }) {
    if (!Settings || Settings.length === 0) {
      return <EmptyState message="This device does not support / have any settings" BackButton={false} />;
    }
  
    return (
      <View style={[styles.CenterAlignmentContainer, { backgroundColor: useTheme().background }]}>
        <View style={[styles.ContentWrapper, { backgroundColor: useTheme().card }]}>
          {Settings.map((setting: any, index: number) => (
            <React.Fragment key={index}>
              {setting.settingtype === 'Button' ? (
                setting.buttons.map((button: any, idx: number) => (
                  <View key={idx} style={styles.SettingsItem}>
                    <Ionicons name='help-circle' color={useTheme().text} size={32}/>
                    <TouchableOpacity style={[styles.SettingsModalButton, { backgroundColor: useTheme().border }]}>
                      <Text style={[styles.value, { color: useTheme().text }]}>{button.value}</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.SettingsItem}>
                  <Ionicons name='help-circle' color={useTheme().text} size={32}/>
                  <Text style={[styles.label, { color: useTheme().text }]}>{setting.label}</Text>
                  <TouchableOpacity style={[styles.SettingsModalButton, { backgroundColor: useTheme().border }]}>
                    <Text style={[styles.value, { color: useTheme().text }]}>{setting.value}</Text>
                    <Text style={[styles.unit, { color: useTheme().text }]}>{setting.unit}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  }