import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import systemconfig from '../../DummyData/GatewayConfig.json';

interface DynamicCardProps {
  ID: string;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ ID }) => {
  const cardData = systemconfig.system.devices.find(item => item.ID === ID);
  const theme = useTheme();

  const handlePress = () => {
    router.push(`/Devices/${ID}/`);
  };

  if (!cardData) {
    return(
      <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
        <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
          <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]}>
            Device not found
          </Text>
        </View>
      </View>
    )
  }

  const firstOption = cardData.Settings && cardData.Settings.length > 0 ? cardData.Settings[0] : null;
  const hasSettings = firstOption !== null;

  const [modalVisible, setModalVisible] = useState(false);
  const [blink, setBlink] = useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);


return (
  <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
    <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
      <MaterialCommunityIcons name={cardData.classIcon as any} style={styles.Wrappericon} color={theme.whiteText} />
      <View style={{ flex: 1}}>
        <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]}>
          {cardData.class}
        </Text>
        <Text style={[styles.deviceTitle, { color: theme.selected }]}>
          {cardData.title}
        </Text>
      </View>
      {cardData.Alarms && cardData.Alarms.length > 0 && (
        <Ionicons name='warning' style={[styles.Wrappericon, { opacity: blink ? 1 : 0.5 }]} color={theme.notification}/>
      )}
    </View>

    {/* Enclosed Main Content */}
    <View style={{ paddingBottom: 10 }}>
      {/* Status Segment */}
      <View style={styles.status}>
        <Text style={[styles.buttonText, { color: theme.text }]}>{cardData.status}</Text>
      </View>

      {/* Main segment */}
      <View style={styles.layout}>
        {Array.isArray(cardData.Specifications.summary) && cardData.Specifications.summary.map((section, sectionIdx) => {
          const [sectionName, items] = Object.entries(section)[0];

          if (sectionName.toLowerCase() === 'classicon' && Array.isArray(items)) {
            return (
              <View key={sectionIdx} style={[styles.layoutItem, {}]}>
                <MaterialCommunityIcons name={cardData.classIcon as any} size={100} color={theme.invertbackground} />
                {items && Array.isArray(items) && items.map((value: { value: string; unit: string }, idx: number) => (
                  <Text key={idx} style={[styles.text, { color: theme.text }]}>
                    {value.value}
                    <Text style={styles.unit}>{value.unit}</Text>
                  </Text>
                ))}
              </View>
            );
          }

          return (
            <View key={sectionIdx} style={styles.layoutItem}>
              <Text style={[styles.deviceCategory, { color: theme.text }]}>{sectionName}</Text>
              {Array.isArray(items) && items.map((value: { value: string; unit: string }, idx: number) => (
                <Text key={idx} style={[styles.text, { color: theme.text }]}>
                  {value.value}
                  <Text style={styles.unit}>{value.unit}</Text>
                </Text>
              ))}
            </View>
          );
        })}
      </View>

      {/* Bottom segment */}
      <View style={styles.buttonContainer}>
        {hasSettings && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.border }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>Settings</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.border }]} onPress={() => handlePress()}>
          <Text style={[styles.buttonText, { color: theme.text }]}>More <Ionicons name='open' /></Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal View */}
      {modalVisible && hasSettings && cardData.Settings && cardData.Settings[0] && (
        <View style={[styles.modalWrapper, { backgroundColor: theme.border }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            {cardData.Settings[0].label}
          </Text>
          <Text style={[styles.text, { color: theme.text, backgroundColor: theme.background, padding: 15, borderRadius: 8 }]}>
            {cardData.Settings[0].value}<Text style={styles.unit}>
            {cardData.Settings[0].unit || ''}</Text>
          </Text>
          <View style={styles.buttonContainer}>
            {cardData.Settings[0]?.buttons.map((value: { value: string, name: string }, idx: number) => (
              <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: theme.card }]}>
                <Text style={[styles.buttonText, { color: theme.text }]}>{value.name}</Text>
              </TouchableOpacity>
            ))}
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
    minWidth: 320,
    maxWidth: 500,
    flex: 1,
    overflow: 'hidden',
  },
  headerWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  Wrappericon: {
    marginHorizontal: 10,
    fontSize: 50,
  },
  deviceCategory: {
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
    marginVertical: 15,
    alignItems: 'center',
  },
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
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