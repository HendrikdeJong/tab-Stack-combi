import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/Styling/Theme";


interface CustomFlatListProps {
  data: Array<{ ID: string }>; 
  renderItem: (props: {
    item: { ID: string };
    index: number;
    numColumns: number;
  }) => JSX.Element;
  addGhostItems?: boolean;
  CenterItems?: boolean;
  paginationStyle?: object;
  paginationDotStyle?: object;
  ghostItemKeyPrefix?: string;
  onPageChange?: (newPage: number) => void;
  cardWidth?: number;
  cardHeight: number;
  minCardWidth: number;
  maxCardWidth: number;
  overrideNumColumns?: number;
  overrideNumRows?: number;
  ColumnLimit?: number;
  RowLimit?: number;
  itemGap?: number;
  containerpadding?: number;
  collapsedheight?: number;
}
export default function CustomFlatList({
    data,
    renderItem,
    addGhostItems = true,
    CenterItems = false,
    paginationStyle = {},
    paginationDotStyle = {},
    ghostItemKeyPrefix = "ghost-placeholder",
    onPageChange = () => {},
    cardWidth,
    cardHeight,
    minCardWidth,
    maxCardWidth,
    overrideNumColumns,
    overrideNumRows,
    ColumnLimit,
    RowLimit,
    itemGap = 0,
    containerpadding = 0,
    collapsedheight =0,
  }: CustomFlatListProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [numColumns, setNumColumns] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const theme = useTheme();
  
    const onLayout = (event: LayoutChangeEvent) => {
      const { width: containerWidth, height: containerHeight } = event.nativeEvent.layout;

      const effectiveCardHeight = numColumns == 1 ? collapsedheight : cardHeight + itemGap;
      const availableHeight = containerHeight - 2 * containerpadding;
  
        const columns = overrideNumColumns == null? 
        Math.min(Math.max(Math.floor(containerWidth / Math.min(Math.max(minCardWidth, (cardWidth ?? containerWidth / 2)),maxCardWidth)), 1), ColumnLimit ?? 120) : overrideNumColumns

        const rows = overrideNumRows == null?
        Math.min(Math.max(Math.floor((availableHeight - (itemGap * 2.5)) / effectiveCardHeight), 1), RowLimit ?? 120) : overrideNumRows
  
        setNumColumns(columns);
        setItemsPerPage(columns * rows);
    };
  
    useEffect(() => {
      setCurrentPage(0);
    }, [numColumns, itemsPerPage]);
  
    // Ensure at least one card is available
    const safeData = data.length === 0 ? [{ ID: "safety-card" }] : data;
  
    const totalPages = Math.ceil(safeData.length / itemsPerPage);
  
    const getCurrentPageData = () => {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return safeData.slice(startIndex, endIndex);
    };
  
    const currentPageData = getCurrentPageData();
    const remainder = currentPageData.length % numColumns;
    const ghostBlocksNeeded = addGhostItems && remainder !== 0 ? numColumns - remainder : 0;
  
    const dataWithGhosts = [
      ...currentPageData,
      ...Array.from({ length: ghostBlocksNeeded }, (_, index) => ({
        ID: `${ghostItemKeyPrefix}-${index}`,
      })),
    ];
  
    const handlePageChange = (newPage: number) => {
      setCurrentPage(newPage);
      onPageChange(newPage);
    };
  
    return (
      <View style={{ flex: 1 }} onLayout={onLayout}>
        <FlatList
          data={dataWithGhosts}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item, index) => item.ID + index}
          renderItem={({ item, index }) => renderItem({ item, index, numColumns })}
          contentContainerStyle={[
            { gap: itemGap, padding: containerpadding, flex: 1 },
            CenterItems && numColumns !=1 ? { justifyContent: "center", } : { justifyContent: "flex-start" },
          ]}
          columnWrapperStyle={numColumns > 1 ? { gap: itemGap, justifyContent: "center",} : null}
        />
  
        <View style={[styles.paginationContainer, paginationStyle, {marginVertical: itemGap}]}>
          <TouchableOpacity
            onPress={() => handlePageChange(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
          >
            <Ionicons
              name="chevron-back"
              size={60}
              color={currentPage === 0 ? theme.whiteText : theme.whisperGreen}
            />
          </TouchableOpacity>
  
          {Array.from({ length: totalPages }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                {
                  width: 24,
                  borderRadius: 6,
                  marginHorizontal: 6,
                },
                index === currentPage
                  ? { backgroundColor: theme.whiteText }
                  : { backgroundColor: theme.whisperGreen },
              ]}
              onPress={() => handlePageChange(index)}
            />
          ))}
  
          <TouchableOpacity
            onPress={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={60}
              color={currentPage === totalPages - 1 ? theme.whiteText : theme.whisperGreen}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    aspectRatio: 1 / 1,
    backgroundColor: "#ccc",
  },
});