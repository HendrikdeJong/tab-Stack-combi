import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import LoadingWrapper from "@/Components/LoadingWrapper";
import ComponentCard from "@/Components/ComponentCard";
import { useTheme } from "@/Styling/Theme";

const fetchConfig = async () => {
  // Replace this with your actual fetch logic
  const response = await fetch("/DummyData/GatewayConfig.json");
  if (!response.ok) throw new Error("Failed to fetch configuration.");
  return await response.json();
};

const fetchLiveData = async () => {
    // Simulate fetching live data
    return await fetch("/DummyData/GatewayConfig.json").then((res) => res.json());
  };

export default function LandingPage() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

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

  return (
   
      <LoadingWrapper
        fetchConfig={fetchConfig}
        fetchLiveData={fetchLiveData}
        FetchDataInterval={1000}
        ExtraLoadingTime={3000}
        LoadMsgInterval={1000}
        loadingMessages={[
          "Initializing components...",
          "Contacting satellites...",
          "Gathering device details...",
        ]}
      >
        {(config, liveData) => {
          const devices = config?.system?.devices ?? [];
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

          return (
            <ImageBackground
            source={require("assets/WP_BG_01.jpg")}
            style={{ flex: 1, width: null, height: null }}
            resizeMode="cover"
            blurRadius={10}
            >
              <FlatList
                data={dataWithGhosts}
                key={numColumns}
                numColumns={numColumns}
                keyExtractor={(item) => item.ID}
                renderItem={({ item }) => (
                  <ComponentCard
                    ID={item.ID}
                    hidden={item.ID.startsWith("ghost-placeholder")}
                    numColumns={numColumns}
                  />
                )}
                contentContainerStyle={[
                  styles.flatListContainer,
                  { gap: 16 },
                  width > 320
                    ? { padding: 16 }
                    : { paddingVertical: 16 },
                  height > verticalScale(500)
                    ? { justifyContent: "center" }
                    : { justifyContent: "flex-start" },
                ]}
                columnWrapperStyle={
                  numColumns > 1
                    ? { gap: 16, justifyContent: "center" }
                    : null
                }
                ListFooterComponent={
                  <View style={styles.paginationContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={currentPage === 0}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={verticalScale(24)}
                        color={
                          currentPage === 0
                            ? theme.whiteText
                            : theme.whisperGreen
                        }
                      />
                    </TouchableOpacity>
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.paginationDot,
                          {
                            width: scale(12),
                            borderRadius: scale(2),
                            marginHorizontal: scale(2),
                          },
                          index === currentPage
                            ? { backgroundColor: theme.whiteText }
                            : { backgroundColor: theme.whisperGreen },
                        ]}
                        onPress={() => setCurrentPage(index)}
                      />
                    ))}
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages - 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={verticalScale(24)}
                        color={
                          currentPage === totalPages - 1
                            ? theme.whiteText
                            : theme.whisperGreen
                        }
                      />
                    </TouchableOpacity>
                  </View>
                }
              />
            </ImageBackground>
          );
        }}
      </LoadingWrapper>
    
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  paginationDot: {
    aspectRatio: 1 / 1,
    backgroundColor: "#ccc",
  },
});
