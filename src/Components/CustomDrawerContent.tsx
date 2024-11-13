import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../Styling/Theme';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header */}
      <SafeAreaView style={[styles.drawerHeader, { backgroundColor: theme.whisperGreen }]}>
        <Image
          source={require('../../assets/WpLogo2.png')}
          style={[styles.headerImage, { tintColor: theme.whiteText }]}
        />
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={styles.closeButton}>
          <MaterialCommunityIcons name={"close"} size={40} color={theme.whiteText} />
        </TouchableOpacity>
      </SafeAreaView>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Additional Footer for Android (Optional) */}
      {Platform.OS === 'android' && (
        <View style={[styles.drawerFooter, { backgroundColor: theme.whisperGreen }]}>
          <TouchableOpacity onPress={() => router.replace("../../../systemSelect")} style={styles.closeButton}>
            <Text style={[styles.button, { color: theme.whiteText }]}>
              Choose system <MaterialCommunityIcons name={"logout"} size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    padding: 16,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerImage: {
    flex: 1,
    height: 70,
    resizeMode: 'contain',
  },
  closeButton: {
    
  },
  drawerFooter: {
    padding: 20,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
});