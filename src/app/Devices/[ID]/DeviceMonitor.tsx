import React, {  } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../Styling/Theme';
import {EmptyState, DetailItem} from '../../../Components/CustomFunctions';
import styles from '../../../Styling/StyleSheet';



export default function Device_Information_Page({ Specifications }: { Specifications: any }) {
    const theme = useTheme();
  
    if (!Specifications || Object.keys(Specifications).length === 0) {
      return <EmptyState message="This device does not support / have any specifications" BackButton={false} />;
    }
  
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {Object.keys(Specifications).map((key, index) => (
        <View key={index} style={styles.section}>
        {index !== 0 && (
          <>
          <Text style={[styles.title, { color: theme.text, borderColor: theme.selected }]}>{key}</Text>
          {key !== 'summary' && Specifications[key].map((item: any, idx: number) => (
            <DetailItem key={idx} label={item.label} value={item.value} unit={item.unit} />
          ))}
          </>
        )}
        </View>
      ))}
      </ScrollView>
    );
  }