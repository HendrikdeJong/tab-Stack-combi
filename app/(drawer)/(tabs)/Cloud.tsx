import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../Custom/Theme';

export default function GatewayCloud() {
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={[styles.scrollView, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>Cloud view for octo control pro?</Text>
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