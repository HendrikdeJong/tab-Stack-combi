import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../Styling/Theme';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const drawerCustomHeader = (props: CustomDrawerContentProps) => {
  const theme = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.drawerHeader, { backgroundColor: theme.whisperGreen }]}>
        <Image
          source={require('../../assets/WpLogo2.png')}
          style={[styles.headerImage, { tintColor: theme.whiteText }]}
        />

        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.closeButton}>
          <MaterialCommunityIcons name={"close"} size={40} color={theme.whiteText} /> 
        </TouchableOpacity>
      </View>

      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
};

const drawerCustomFooter = (props: CustomDrawerContentProps) => {
  const theme = useTheme();
  return (
    <View style={[styles.drawerFooter, { backgroundColor: theme.whisperGreen }]}>
      <TouchableOpacity onPress={() => router.replace("../../../systemSelect")} style={styles.closeButton}>
        <Text style={[styles.button, {color: theme.whiteText}]}>choose system<MaterialCommunityIcons name={"logout"} size={24}/></Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  return (
    <>
      {drawerCustomHeader(props)}
      {Platform.OS == 'android' && (
        drawerCustomFooter(props)
      )}
      {/* uncomment this line to add logout footer to the drawer for android */}
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 35,
    marginTop: -40,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingBottom: 10,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    },
  headerImage: {
    height: 70,
    resizeMode: 'contain',
  },
  closeButton: {
    padding: 10,
  },
  drawerFooter: {
    padding: 20,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

