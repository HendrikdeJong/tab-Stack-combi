import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    label: {
      fontSize: 20,
    },
    valueContainer: {
      flexDirection: 'row',
    },
    value: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    unit: {
      fontSize: 16,
      alignSelf: 'flex-end',
      marginLeft: 2,
      fontWeight: 'bold',
    },
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    screenText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
    CenterAlignmentContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    ContentWrapper: {
      width: '90%',
      height: '90%',
      justifyContent: 'space-evenly',
      paddingHorizontal: 24,
    },
    SettingsItem: {
      flex: 1,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    SettingsModalButton: {
      flexDirection: 'row',
      padding: 8,
      borderRadius: 8,
    },
    SettingButton: {
      fontSize: 24,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#000000',
    },
  });
export default styles;