import { StyleSheet, FlatList, useWindowDimensions, ScrollView } from 'react-native';
import systemconfig from '../../../DummyData/GatewayConfig.json'; // this is a dummy data file that is used to populate the gateway
import ComponentCard from '../../Components/ComponentCard';

export default function GatewayLocal() {
  const devices = systemconfig.system.devices;
  const { width } = useWindowDimensions();

  const getNumColumns = () => {
    if (width > 1200) return 3;
    if (width > 700) return 2;
    return 1;                   
  };

  const numColumns = getNumColumns();

  return (
    <FlatList
      data={devices}
      key={numColumns}
      keyExtractor={(item) => item.ID}
      renderItem={({ item }) => <ComponentCard ID={item.ID} />}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    padding: 10,
  },
});