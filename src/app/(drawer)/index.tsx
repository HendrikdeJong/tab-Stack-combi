import { useFetchConfig } from "@/Components/CustomFunctions";
import { useTheme } from "@/Styling/Theme";
import ComponentCard from "@/Components/ComponentCard";
import React from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Button, Text } from "react-native";

export default function Demolib() {
    const { width } = useWindowDimensions();
    const { loading, config, error } = useFetchConfig();
    const devices = config?.system?.devices ?? [];
    const theme = useTheme();

    const getNumColumns = () => {
        if (width > 1200) return 3;
        if (width > 700) return 2;
        return 1;                   
    };
    const numColumns = getNumColumns();

    const remainder = devices.length % numColumns;
    const ghostBlocksNeeded = remainder === 0 ? 0 : numColumns - remainder;

    const dataWithGhosts = [
        ...devices,
        ...Array.from({ length: ghostBlocksNeeded }, (_, index) => ({
            ID: `ghost-placeholder-${index}`,
        })),
    ];

      
    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={useTheme().whisperGreen} />
        </View>
        );
    }

    if (error) {
        return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Retry" onPress={() => window.location.reload()} />
        </View>
        );
    }


    return (
        <FlatList
            data={dataWithGhosts}
            key={numColumns}
            numColumns={numColumns}
            keyExtractor={(item, index) => item.ID + index}
            renderItem={({ item }) => <ComponentCard ID={item.ID} collapsible={numColumns === 1} hidden={item.ID.startsWith("ghost-placeholder")}/>}
            columnWrapperStyle={numColumns > 1 ? styles.columnWrapper : null}
            contentContainerStyle={{marginHorizontal: width > 350 ? 16 : 0, marginVertical: 16}}
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        flexGrow: 1,
        margin: 16,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EF5350',
      },
      errorText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
      },
      columnWrapper: {
        justifyContent: 'space-evenly',
        gap: 16,
      },
      title: {
        textAlign: 'center',
        fontSize: 50,
        padding: 10,
      },
});


