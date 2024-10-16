import { Drawer } from 'expo-router/drawer';
import { useTheme } from '../../Custom/Theme';
import CustomDrawerContent from '../../Custom/CustomDrawerContent';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
      <Drawer initialRouteName="(tabs)"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
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
            
        <Drawer.Screen name="(tabs)" options={{ title: 'Home', drawerIcon: () => (<Ionicons name='home' size={30} color={theme.text}></Ionicons>)}} />
        <Drawer.Screen name="settings" options={{ title: 'Settings', drawerIcon: () => (<Ionicons name='settings' size={30} color={theme.text}></Ionicons>)}} />
        <Drawer.Screen name="alerts" options={{ title: 'Alerts', drawerIcon: () => (<Ionicons name='notifications' size={30} color={theme.text}></Ionicons>)}} />
      </Drawer>
    </GestureHandlerRootView>
  );
}