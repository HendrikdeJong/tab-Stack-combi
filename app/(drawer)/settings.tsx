import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../Custom/Theme';

export default function settings() {
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>settings screen</Text>
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