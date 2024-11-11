import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { useTheme } from '../../../Styling/Theme';
import { EmptyState, DetailItem } from '../../../Components/CustomFunctions';
import styles from '../../../Styling/StyleSheet';

export default function Device_Information_Page({ Specifications }: { Specifications: any }) {
  const theme = useTheme();

  // If Specifications are empty or null, display an empty state
  if (!Specifications || Object.keys(Specifications).length === 0) {
    return <EmptyState message="This device does not support / have any specifications" BackButton={false} />;
  }

  // Prepare sections array for SectionList
  const sections = Object.keys(Specifications)
    .filter(key => key !== 'summary') // Remove 'summary' if it shouldn't be displayed
    .map((key) => ({
      title: key,
      data: Specifications[key],
    }));

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.label + index}
      style={[styles.container, { backgroundColor: theme.background }]}
      ItemSeparatorComponent={() => <View style={{ paddingVertical: 5 }} />}
      renderItem={({ item }) => (
        <DetailItem 
          label={item.label} 
          value={item.value} 
          unit={item.unit} 
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.title, { color: theme.text, borderColor: theme.selected }]}>
            {title}
          </Text>
      )}
    />
  );
}
