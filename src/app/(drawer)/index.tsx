import { useFetchConfig } from "@/Components/CustomFunctions";
import { useTheme } from "@/Styling/Theme";
import ComponentCard from "@/Components/ComponentCard";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Text, TouchableOpacity, SafeAreaView, ImageBackground, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from "react-native-size-matters";

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
    const getNumRows = () => {
        if (height > verticalScale(600)) return 3;
        if (height > verticalScale(400)) return 2;
        return 1;          
    };
    const numRows = getNumRows();
    const itemsPerPage = numColumns * numRows;

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(devices.length / itemsPerPage);

    // Ensure currentPage is valid whenever numColumns or totalPages change
    useEffect(() => {
        if (currentPage >= totalPages) {
            setCurrentPage(0);
        }
    }, [numColumns, totalPages]);

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
        <ImageBackground
            source={require('assets/WP_BG_01.jpg')}
            style={{ flex: 1, width: null, height: null,}}
            resizeMode="cover"
            blurRadius={10}
        >
            {Platform.OS === "web" ? 
                <FlatList
                    data={dataWithGhosts}
                    key={numColumns}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => item.ID + index}
                    renderItem={({ item }) => (
                        <ComponentCard
                            ID={item.ID}
                            hidden={item.ID.startsWith("ghost-placeholder")}
                            Iscollapsible={false}
                            numColumns={numColumns}
                        />
                    )}
                    contentContainerStyle={[width > 320? {padding: 16}: {paddingVertical: 16}, height > verticalScale(500) ? {justifyContent: "center",} : {justifyContent: "flex-start"}, {gap: 16 }]}
                    columnWrapperStyle={numColumns > 1 ? { gap: 16, justifyContent: 'center',} : null}
                    ListFooterComponent={
                        <View style={styles.paginationContainer}>
                            <TouchableOpacity
                            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}>
                                <Ionicons name="chevron-back" size={verticalScale(24)} color={theme.whisperGreen} />
                            </TouchableOpacity>
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <TouchableOpacity key={index}style={[styles.paginationDot,{width: scale(12), borderRadius: scale(2), marginHorizontal: scale(2)}, index === currentPage ? {backgroundColor: theme.whiteText} : {backgroundColor: theme.whisperGreen}]} onPress={() => setCurrentPage(index)}/>
                                ))}
                            <TouchableOpacity
                            onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1}>
                                <Ionicons name="chevron-forward" size={verticalScale(24)} color={theme.whisperGreen} />
                            </TouchableOpacity>
                        </View>
                    }
                /> :
                <FlatList
                   data={devices}
                   key={numColumns}
                   numColumns={numColumns}
                   keyExtractor={(item, index) => item.ID + index}
                   renderItem={({ item }) => (
                       <ComponentCard
                           ID={item.ID}
                           hidden={item.ID.startsWith("ghost-placeholder")}
                           Iscollapsible={true}
                           numColumns={numColumns}
                       />
                   )}
                   contentContainerStyle={[width > 320? {padding: 16}: {paddingVertical: 16}, height > verticalScale(500) ? {justifyContent: "center",} : {justifyContent: "flex-start"}, {gap: 16 }]}
                   columnWrapperStyle={numColumns > 1 ? { gap: 16, justifyContent: 'center',} : null}
               />
        }
        </ImageBackground>
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
    },
    paginationDot: {
        aspectRatio: 1/1,
        backgroundColor: '#ccc',
    },

});
