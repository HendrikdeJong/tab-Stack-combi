import { View, Text, ScrollView, StyleSheet, Button, Platform } from 'react-native';
import { useTheme } from '../../Styling/Theme';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function About() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center'}}>
      <View style={[styles.screenContainer, { backgroundColor: theme.card}]}>
        <Text style={[styles.title, {color: theme.text}]}>Thanks for trying out our new concept of the WhisperCare app.</Text>
        <Text style={[styles.screenText, {color: theme.text}]}>This app can be used to monitor and control your systems, either locally with the help of the OctoControl Gateway or remotely via the WhisperCare 2.0 cloud.</Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
title: {
  fontSize: 24,
  fontWeight: 'bold',
},
screenContainer: {
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  padding: 20,
  gap: 20,
  borderRadius: 10,
  textAlign: 'left',
},
screenText: {
  fontSize: 18,
},
});