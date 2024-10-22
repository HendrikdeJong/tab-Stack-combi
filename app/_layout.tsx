import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../Custom/Theme';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';

export default function Layout() {
  const theme = useTheme();
  return (
    <ThemeProvider>
      <StatusBar style='light'/>
      <Stack screenOptions={{
          headerStyle: {
            backgroundColor: theme.whisperGreen,
          },
          headerTintColor: theme.whiteText,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.whiteText,
          },
          contentStyle: {
            backgroundColor: theme.invertbackground,
          },
        }}
      >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="ComponentOverviewScreen" options={{ title: 'Component Overview' }}/> */}
        {/* <Stack.Screen name="Demo Library" options={{ title: 'Info Screen' }} /> */}
        {/* <Stack.Screen name="settings" options={{ title: 'Setting Screen' }} />
        <Stack.Screen name="alerts" options={{ title: 'Alert Screen' }} /> */}
      </Stack>
    </ThemeProvider>
  );
}