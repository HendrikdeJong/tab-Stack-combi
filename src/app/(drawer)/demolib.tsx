import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600; // Adjust this value based on your needs

const getNumColumns = () => {
  if (width > 2000) return 4;
  if (width > 1200) return 3;
  if (width > 640) return 2;
  return 1;
};
const NUM_COLUMNS = getNumColumns();
const CARDS_PER_PAGE = 6;

const data = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
}));

const PaginatedCards = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIdx = currentPage * CARDS_PER_PAGE;
  const endIdx = startIdx + CARDS_PER_PAGE;
  const paginatedData = data.slice(startIdx, endIdx);

  const nextPage = () => {
    if (endIdx < data.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (startIdx > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={paginatedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        key={NUM_COLUMNS} // Important to trigger rerender when changing number of columns
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={
        <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={prevPage} disabled={startIdx === 0} style={styles.button}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={nextPage} disabled={endIdx >= data.length} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
        }
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default PaginatedCards;
