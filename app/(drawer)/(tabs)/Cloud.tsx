import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../Custom/Theme';

export default function GatewayCloud() {
  const theme = useTheme();
  return (
    <ScrollView style={{backgroundColor: theme.background}}>
      <Text>cloud Gateway Screen</Text>
    </ScrollView>
  );
}