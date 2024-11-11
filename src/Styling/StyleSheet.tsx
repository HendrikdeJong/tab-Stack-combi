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
      height: '90%',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },

    listitemContainer: {
      padding: 10,
      borderRadius: 5,
      marginBottom: 5,
      overflow: 'hidden',
    },
    ItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    alertText: {
      fontSize: 14,
      flex: 1,
    },
    alertIcon: {
      fontSize: 20,
      marginRight: 5,
      textAlignVertical: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 5,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    sortSelector: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sortOption: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      borderRadius: 5,
      alignItems: 'center',
    },
    SettingsItem: {
      marginHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    SettingsModalButton: {
      marginHorizontal: 10,
      flexDirection: 'row',
      padding: 8,
      borderRadius: 8,
      textAlign: 'center',
    },
    SettingButton: {
      fontSize: 24,
      padding: 10,
      borderRadius: 5,
    },
  });
export default styles;