import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from './Theme';

const drawerCustomHeader = (props) => {
  const theme = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.drawerHeader, { backgroundColor: theme.whisperGreen }]}>
        <Image
          source={require('../assets/WpLogo2.png')}
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

const styles = StyleSheet.create({
  drawerHeader: {
    margin: 0,
    marginTop: -30,
    paddingTop: 50,
    flexDirection: 'row',
    display: 'flex',
    justifyContent:'space-around',
  },
  headerImage: {
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
  },
});

export default drawerCustomHeader;
