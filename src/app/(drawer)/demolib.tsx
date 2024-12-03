import { useFetchConfig } from "@/Components/CustomFunctions";
import { useTheme } from "@/Styling/Theme";
import ComponentCard from "@/Components/ComponentCard";
import React from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Button, Text, ScrollView } from "react-native";

export default function Demolib() {
    const { width } = useWindowDimensions();
    const theme = useTheme();
    const getNumColumns = () => {
        if (width > 1200) return 3;
        if (width > 640) return 2;
        return 1;                   
    };
    const numColumns = getNumColumns();




    return (
      <ScrollView style={{}} contentContainerStyle={{}}>
        <View>
        </View>
        {/* <FlatList
            data={data}
            key={numColumns}
            numColumns={numColumns}
            keyExtractor={(item, index) => item.ID + index}
            renderItem={({ item }) => <ComponentCard ID={item.ID} collapsible={numColumns === 1} hidden={item.ID.startsWith("ghost-placeholder")}/>}
            // columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
            contentContainerStyle={{marginHorizontal: width > 350 ? 16 : 0, marginVertical: 16}}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
            /> */}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    
});


