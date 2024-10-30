import { ThemeProvider, useTheme } from '../../Styling/Theme';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, Stack } from 'expo-router';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function DrawerLayout() {
  const theme = useTheme();
  
  const CustomHomeHeader = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.whisperGreen }}>
      <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => router.push({ pathname: './' })}>
          <Image
            source={require('../../../assets/WpLogo2.png')}
            style={{resizeMode: 'contain', tintColor: theme.text}}
          />
        </TouchableOpacity>

      </View>
      <View style={{ flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.button,]}
          onPress={() => router.push({ pathname: '/Settings' })}>
          <Text style={[styles.buttontext, { color: theme.text }]}>
            Settings <Ionicons name="settings" style={[styles.buttontext, {}]}/>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => router.push({ pathname: '/Alarms' })}>
          <Text style={[styles.buttontext, { color: theme.text }]}>
            Alarms <Ionicons name="warning" style={[styles.buttontext, {}]} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerStyle: { backgroundColor: theme.whisperGreen },
            headerTintColor: theme.whiteText,
            headerTitleStyle: { fontWeight: 'bold', fontSize: 40, },
            headerTitleAlign: 'center',
            header: () => <CustomHomeHeader />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: '',
              contentStyle: { backgroundColor: theme.background },
            }}
          />
          <Stack.Screen
            name="Settings"
            options={{
              title: 'Settings',
              contentStyle: { backgroundColor: theme.background },
            }}
          />
          <Stack.Screen
            name="Alarms"
            options={{
              title: 'Alarms',
              contentStyle: { backgroundColor: theme.background },
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    height: 100,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttontext: {
    fontSize: 50,
    textAlignVertical: 'center',
  }
});
