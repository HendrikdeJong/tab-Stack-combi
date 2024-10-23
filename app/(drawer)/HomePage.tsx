import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../../Custom/Theme';
import { useEffect, useState } from 'react';

export default function GatewayLocal() {
  const theme = useTheme();
  
  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>card view for gateway</Text>
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