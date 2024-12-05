import { useFetchConfig } from "@/Components/CustomFunctions";
import { useTheme } from "@/Styling/Theme";
import ComponentCard from "@/Components/ComponentCard";
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function LandingPage() {
    const { width, height } = useWindowDimensions();
    const { loading, config, error } = useFetchConfig();
    const devices = config?.system?.devices ?? [];
    const theme = useTheme();

    const getNumColumns = () => {
        if (width > 1200) return 3;
        if (width > 640) return 2;
        return 1;                   
    };
    const numColumns = getNumColumns();
    const itemsPerPage = numColumns * 2;

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(devices.length / itemsPerPage);

    const getCurrentPageData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return devices.slice(startIndex, endIndex);
    };

    const currentPageData = getCurrentPageData();
    const remainder = currentPageData.length % numColumns;
    const ghostBlocksNeeded = remainder === 0 ? 0 : numColumns - remainder;

    const dataWithGhosts = [
        ...currentPageData,
        ...Array.from({ length: ghostBlocksNeeded }, (_, index) => ({
            ID: `ghost-placeholder-${index}`,
        })),
    ];

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.whisperGreen} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => window.location.reload()}>
                    <Ionicons name="reload" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={dataWithGhosts}
            key={numColumns}
            numColumns={numColumns}
            keyExtractor={(item, index) => item.ID + index}
            renderItem={({ item }) => (
                <ComponentCard
                    ID={item.ID}
                    collapsible={numColumns === 1}
                    hidden={item.ID.startsWith("ghost-placeholder")}
                />
            )}
            contentContainerStyle={
                width > 320
                    ? numColumns > 1
                        ? { padding: 16, gap: 16 }
                        : { padding: 16, gap: 16 }
                    : { gap: 16, paddingVertical: 16 }
            }
            columnWrapperStyle={numColumns > 1 ? { gap: 16 } : null}
            ListFooterComponent={
                <View>
                    <View style={styles.paginationContainer}>
                        <TouchableOpacity
                            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                        >
                        <Ionicons name="chevron-back" size={48} color={theme.whisperGreen} />
                        </TouchableOpacity>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <TouchableOpacity key={index}style={[styles.paginationDot,index === currentPage ? {backgroundColor: theme.whiteText} : {backgroundColor: theme.whisperGreen}]} onPress={() => setCurrentPage(index)}/>
                            ))}
                        <TouchableOpacity
                            onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1}
                        >
                            <Ionicons name="chevron-forward" size={48} color={theme.whisperGreen} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },

});