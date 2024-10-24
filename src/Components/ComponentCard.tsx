import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Components/Theme';
import { router } from 'expo-router';
import systemconfig from '../../DummyData/GatewayConfig.json';

interface DynamicCardProps {
  ID: string;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ ID }) => {
  const theme = useTheme();
  const cardData = systemconfig.system.devices.find(item => item.ID === ID);

  if (!cardData) {
    return <Text>Card data not found</Text>;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [limitValue, setLimitValue] = useState(parseInt(cardData.options.value));

  const incrementLimit = () => {
    setLimitValue(prev => Math.min(prev + 1, parseInt(cardData.options.maxvalue)));
  };

  const decrementLimit = () => {
    setLimitValue(prev => Math.max(prev - 1, parseInt(cardData.options.minvalue)));
  };

  const hasSettings = cardData.options && Object.keys(cardData.options).length > 0;

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>

      
      {/* Header segment */}
      <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        <Ionicons name={cardData.classIcon as any} style={styles.headerIconStyle} color={theme.whiteText} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.deviceType, { color: theme.whiteText, borderColor: theme.selected }]}>
            {cardData.class}
          </Text>
          <Text style={[styles.deviceTitle, { color: theme.selected }]}>
            {cardData.title}
          </Text>
        </View>
        <Ionicons name='warning' style={styles.headerIconStyle} color={theme.whiteText} />
      </View>

      {/* Enclosed Main Content */}
      <View style={{paddingBottom: 10,}}>
        {/* Status Segment */}
        <View style={styles.status}>
          <Text style={[styles.buttonText, { color: theme.text }]}>{cardData.status}</Text>
        </View>

       {/* Main segment */}
        <View style={styles.layout}>
          <View style={styles.layoutItem}>
            <Text style={[styles.deviceType, { color: theme.border }]}>AC Input</Text>
            {cardData.details.summary.table1.map((value, idx) => (
              <Text key={idx} style={[styles.text, { color: theme.text }]}>
                {value.value}<Text style={styles.unit}>{value.unit}</Text>
              </Text>
            ))}
          </View>
          <View style={styles.layoutItem}>
            <Ionicons name={cardData.classIcon as any} size={100} color={theme.invertbackground} />
          </View>
          <View style={styles.layoutItem}>
            <Text style={[styles.deviceType, { color: theme.border }]}>DC Output</Text>
            {cardData.details.summary.table2.map((value, idx) => (
              <Text key={idx} style={[styles.text, { color: theme.text }]}>
                {value.value}<Text style={styles.unit}>{value.unit}</Text>
              </Text>
            ))}
          </View>
        </View>

        {/* Bottom segment */}
        <View style={styles.buttonContainer}>
          {hasSettings && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.border }]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.buttonText, { color: theme.text }]}>Set {cardData.options.settingtype}</Text>
              </TouchableOpacity>
            )}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.border }]}
            onPress={() => router.push({ pathname: '/cardOverview', params: { ID: `${cardData.ID}` } })}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>More <Ionicons name='open' /></Text>
          </TouchableOpacity>
        </View>

        {/* Custom Modal View */}
        {modalVisible && (
          <View style={[styles.modalWrapper, { backgroundColor: theme.border }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>{cardData.options.label}</Text>
            <Text style={[styles.text, { color: theme.text, backgroundColor: theme.background, padding: 15, borderRadius: 8 }]}>
              {limitValue}<Text style={styles.unit}>{cardData.options.unit}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={decrementLimit}>
                <Text style={[styles.buttonText, { color: theme.text }]}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={incrementLimit}>
                <Text style={[styles.buttonText, { color: theme.text }]}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.card }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.buttonText, { color: theme.text }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
    borderRadius: 8,
    minWidth: 300,
    maxWidth: 500,
  },
  headerWrapper: {
    flex: 1,
    paddingVertical: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
  },
  headerIconStyle: {
    marginHorizontal: 10,
    fontSize: 50,
  },
  deviceType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceTitle: {
    fontSize: 24,
  },
  unit: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginLeft: 2,
  },
  status: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '100%',
  },
  layoutItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
    width: '100%',
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
  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default DynamicCard;