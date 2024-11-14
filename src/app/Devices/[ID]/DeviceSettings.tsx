import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../Styling/Theme';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../Styling/StyleSheet';
import { EmptyState } from '../../../Components/CustomFunctions';

export default function Device_Control_Page({ Settings }: { Settings: any }) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadfor5seconds = (value: boolean) => {
    setLoading(value);
    if (value) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };
  const [currentSetting, setCurrentSetting] = useState<any>(null);

  if (!Settings || Settings.length === 0) {
    return (
      <EmptyState
        message="This device does not support / have any settings"
        BackButton={false} surroundwithCard={true}      />
    );
  }

  return (
    <View style={[styles.CenterAlignmentContainer, { backgroundColor: theme.background, gap: 20 }]}>
      {Settings.map((setting: any, index: number) => (
        <React.Fragment key={index}>
          {/* BUTTON */}
          {setting.settingtype === 'Button' ? (
            setting.buttons.map((button: any, idx: number) => (
              <TouchableOpacity key={idx} style={[styles.SettingsModalButton, { backgroundColor: theme.border, width: '85%'}]}
              onPress={() => {setCurrentSetting({ ...currentSetting, loadingButton: idx });loadfor5seconds(true);}}
              >
                <View style={{justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>
                  <Text style={[styles.value, { color: theme.text }]}>
                  {button.value}
                  </Text>
                  {currentSetting?.loadingButton === idx && loading && (
                    <ActivityIndicator size="small" color={theme.text} />
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            // Small button that opens modal
            <TouchableOpacity style={[styles.SettingsModalButton, { backgroundColor: theme.border, alignItems: 'center', width: '85%', justifyContent: 'space-between' }]} 
              onPress={() => {
                setCurrentSetting(setting);
                setModalVisible(true);
              }}>
                <Text style={[styles.label, { color: theme.text }]}>{setting.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: theme.card }}>
                  <Text style={[styles.value, { color: theme.text }]}>{setting.value}</Text>
                  <Text style={[styles.unit, { color: theme.text }]}>{setting.unit}</Text>
                </View>
            </TouchableOpacity>
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
                  <Text style={[localStyles.text,{color: theme.text, backgroundColor: theme.background, padding: 15,borderRadius: 8, alignSelf: 'center'}]}>
                    {currentSetting.value}<Text style={localStyles.unit}>{currentSetting.unit || ''}</Text>
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
    margin: 15,
    borderRadius: 10,
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
