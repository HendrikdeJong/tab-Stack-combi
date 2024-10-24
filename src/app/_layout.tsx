import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../Components/Theme';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const theme = useTheme();
  return (
    <GestureHandlerRootView style={{flex: 1,}}>
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
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}