import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from 'expo-router';
import { ThemeProvider, useTheme } from '../../../Custom/Theme';
const {Navigator} = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  const theme = useTheme();
  return <MaterialTopTabs screenOptions={{
      tabBarStyle: { backgroundColor: theme.whisperGreen },
      tabBarActiveTintColor: theme.whiteText,
      tabBarInactiveTintColor: theme.whiteText,
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarIndicatorStyle: { backgroundColor: theme.text, height: 3 },
    }}
  ></MaterialTopTabs>
};
export default Layout