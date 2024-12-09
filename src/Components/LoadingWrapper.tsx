import { useTheme } from "@/Styling/Theme";
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";


interface LoadingWrapperProps<TConfig, TLiveData> {
  fetchConfig: () => Promise<TConfig>;
  fetchLiveData: () => Promise<TLiveData>;
  FetchDataInterval?: number; // Polling interval for live data
  loadingMessages?: string[];
  ExtraLoadingTime?: number; // Additional waiting time in milliseconds
  LoadMsgInterval?: number;
  children: (config: TConfig, liveData: TLiveData) => React.ReactNode;
}

const LoadingWrapper = <TConfig, TLiveData>({
  fetchConfig,
  fetchLiveData,
  FetchDataInterval = 1000,
  loadingMessages = ["Initializing...", "Setting up things...", "Almost there..."],
  ExtraLoadingTime = 0,
  LoadMsgInterval = 2000,
  children,
}: LoadingWrapperProps<TConfig, TLiveData>) => {
  const [config, setConfig] = useState<TConfig | null>(null);
  const [liveData, setLiveData] = useState<TLiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);
  const Theme = useTheme();

  // Cycle through loading messages
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setCurrentMessage(loadingMessages[messageIndex]);
      }, LoadMsgInterval); // Change every 2 seconds
    }

    return () => clearInterval(interval);
  }, [loading, loadingMessages, messageIndex]);

  // Fetch configuration on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const configData = await fetchConfig();
        setConfig(configData);

        // Fetch live data immediately after config loads
        const initialLiveData = await fetchLiveData();
        setLiveData(initialLiveData);

        // Apply waiting time if specified
        if (ExtraLoadingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, ExtraLoadingTime));
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchConfig, fetchLiveData, ExtraLoadingTime]);

  // Fetch live data periodically
  useEffect(() => {
    if (!config) return;

    const interval = setInterval(async () => {
      try {
        const liveData = await fetchLiveData();
        setLiveData(liveData);
      } catch (err) {
        console.error("Failed to fetch live data:", err);
      }
    }, FetchDataInterval);

    return () => clearInterval(interval);
  }, [config, fetchLiveData, FetchDataInterval]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={styles.Text.fontSize} color={Theme.whiteText}/>
        <Text style={[styles.loadingText,{color: Theme.text} ]}>{currentMessage}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.Text, {color: Theme.text}]}>Oops! Something went wrong:</Text>
        <Text style={[styles.errorMessage, {color: Theme.error}]}>{error}</Text>
        <TouchableOpacity onPress={() => window.location.reload()} style={[styles.retryButton, {backgroundColor: Theme.card}]}>
          <Text style={[styles.Text, {color: Theme.text}]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{config && liveData && children(config, liveData)}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  loadingText: {
    marginTop: scale(10),
    fontSize: scale(16),
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontSize: scale(20),
  },
  errorMessage: {
    fontSize: scale(16),
    marginBottom: scale(20),
  },
  retryButton: {
    padding: scale(5),
    borderRadius: scale(5),
  },
});

export default LoadingWrapper;
