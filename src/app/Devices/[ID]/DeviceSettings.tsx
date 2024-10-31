import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../../../Styling/Theme';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../Styling/StyleSheet';
import { EmptyState } from '../../../Components/CustomFunctions';

export default function Device_Control_Page({ Settings }: { Settings: any }) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<any>(null);

  if (!Settings || Settings.length === 0) {
    return (
      <EmptyState
        message="This device does not support / have any settings"
        BackButton={false}
      />
    );
  }

  return (
    <View style={[styles.CenterAlignmentContainer, { backgroundColor: theme.background, gap: 20 }]}>
      {Settings.map((setting: any, index: number) => (
        <React.Fragment key={index}>
          {/* BUTTON */}
          {setting.settingtype === 'Button' ? (
            setting.buttons.map((button: any, idx: number) => (
              <View key={idx} style={styles.SettingsItem}>
                <TouchableOpacity
                  style={[styles.SettingsModalButton, { backgroundColor: theme.border, flex: 1 }]}>
                  <Text style={[styles.value, { color: theme.text }]}>{button.value}</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            // Small modal button
            <View style={styles.SettingsItem}>
              <Text style={[styles.label, { color: theme.text }]}>
                <Ionicons name='help-circle' color={theme.text} size={32} />
                {setting.label}
              </Text>
              <TouchableOpacity
                style={[styles.SettingsModalButton, { backgroundColor: theme.border }]}
                onPress={() => {
                  setCurrentSetting(setting);
                  setModalVisible(true);
                }}
              >
                <Text style={[styles.value, { color: theme.text }]}>{setting.value}</Text>
                <Text style={[styles.unit, { color: theme.text }]}>{setting.unit}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Modal for Setting Details */}
          {modalVisible && currentSetting && (
            <Modal
              transparent
              visible={modalVisible}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={[localStyles.modalOverlay, {}]}>
                <View style={[localStyles.modalWrapper, { backgroundColor: theme.border }]}>
                  <Text style={[localStyles.modalTitle, { color: theme.text }]}>
                    {currentSetting.label}
                  </Text>
                  <Text style={[localStyles.text,{color: theme.text,backgroundColor: theme.background,padding: 15,borderRadius: 8,}]}>
                    {currentSetting.value}
                    <Text style={localStyles.unit}>{currentSetting.unit || ''}</Text>
                  </Text>
                  <View style={localStyles.buttonContainer}>
                    {currentSetting?.buttons &&
                      currentSetting.buttons.map(
                        (value: { value: string; name: string }, idx: number) => (
                          <TouchableOpacity key={idx} style={[localStyles.button, { backgroundColor: theme.card }]}>
                            <Text style={[localStyles.buttonText, { color: theme.text }]}>
                              {value.name}
                            </Text>
                          </TouchableOpacity>
                        )
                      )}
                    <TouchableOpacity
                      style={[localStyles.button, { backgroundColor: theme.card }]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={[localStyles.buttonText, { color: theme.text }]}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const localStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalWrapper: {
    padding: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  unit: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginLeft: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
