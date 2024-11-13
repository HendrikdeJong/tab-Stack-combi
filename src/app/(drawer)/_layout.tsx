import { Drawer } from 'expo-router/drawer';
import { ThemeProvider, useTheme } from '../../Styling/Theme';
import CustomDrawerContent from '../../Components/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

export default function DrawerLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
      <ThemeProvider>
        <Drawer initialRouteName="index"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerShadowVisible: false,
              headerStyle: { backgroundColor: theme.whisperGreen, },
              headerTintColor: theme.whiteText,
              headerTitleStyle: { fontWeight: 'bold', },
              drawerStyle: { backgroundColor: theme.background, },
              sceneContainerStyle: { backgroundColor: theme.background,},
              drawerActiveBackgroundColor: theme.border,
              drawerInactiveBackgroundColor: theme.background,
              drawerActiveTintColor: theme.text,
              drawerInactiveTintColor: theme.text ,
            }}>
          <Drawer.Screen name="index" options={{ title: 'Home', drawerIcon: () => (<Ionicons name='home' size={30} color={theme.text}/>)}}/>
          <Drawer.Screen name="Alarms" options={{ title: 'Alarms', drawerIcon: () => (<Ionicons name='notifications' size={30} color={theme.text}/>)}}/>
          <Drawer.Screen name="Settings" options={{ title: 'Settings', drawerIcon: () => (<Ionicons name='settings' size={30} color={theme.text}/>)}}/>
          <Drawer.Screen name="About" options={{ title: 'About', drawerIcon: () => (<Ionicons name='information-circle' size={30} color={theme.text}/>)}}/>
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}