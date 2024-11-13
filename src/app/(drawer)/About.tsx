import { View, Text, ScrollView, StyleSheet, Button, Platform } from 'react-native';
import { useTheme } from '../../Styling/Theme';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { EmptyState } from '@/Components/CustomFunctions';


export default function About() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <EmptyState message={'this page is still under development'} BackButton={false} surroundwithCard={true}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
scrollView: {
  flexGrow: 1,
  justifyContent: 'center',
},
title: {
  textAlign: 'center',
  fontSize: 50,
  padding: 10,
},
});