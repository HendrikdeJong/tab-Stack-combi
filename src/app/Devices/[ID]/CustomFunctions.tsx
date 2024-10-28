import { router } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../Styling/Theme";
import { Ionicons } from '@expo/vector-icons';
import styles from "../../../Styling/StyleSheet";


export function EmptyState({ message, BackButton }: { message: string, BackButton: boolean }) {
    const theme = useTheme();
    return (
      <View style={[styles.CenterAlignmentContainer, { backgroundColor: theme.background }]}>
        <View style={styles.screenContainer}>
          <Text style={[styles.screenText, { color: theme.text }]}>{message}</Text>
            {BackButton == true && (
             <TouchableOpacity onPress={() => router.navigate('./')} style={styles.SettingButton}>
                <Text style={[styles.screenText, { color: theme.text }]}><Ionicons name='arrow-back' style={{fontSize: 24}}/>Go back</Text>
             </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

export function DetailItem({ label, value, unit }: { label: string; value?: string; unit?: string }) {
    const theme = useTheme();
        return (
          <View style={styles.itemContainer}>
              <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
              <View style={styles.valueContainer}>
                  {value && <Text style={[styles.value, { color: theme.text }]}>{value}</Text>}
                  {unit && <Text style={[styles.unit, { color: theme.text }]}>{unit}</Text>}
              </View>
          </View>
        );
    }