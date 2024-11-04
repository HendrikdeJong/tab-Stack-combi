import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import WpIcons from '../icons/WhisperPowerIconLib';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import { useFetchConfig } from './CustomFunctions';

interface DynamicCardProps {
  ID: string;
}

const DynamicCard: React.FC<DynamicCardProps> = ({ ID }) => {
  // Hook Calls
  const { loading, config, error } = useFetchConfig(); // Fetch configuration
  const theme = useTheme(); // Fetch theme

  const [modalVisible, setModalVisible] = useState(false);
  const [blink, setBlink] = useState(true);

  // UseEffect for blinking warning icon
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const handleButtonPress = (buttonName: string) => {
    setLoadingButton(buttonName);
    setTimeout(() => {
      setLoadingButton(null);
    }, Math.random() * 5000);
  };

  // Find the card data once configuration is loaded
  const cardData = config?.system?.devices?.find(item => item.ID === ID) || null;

  const handlePress = () => {
    router.push(`/Devices/${ID}/`);
  };

  // Loading State
  if (loading) {
    return (
      <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
       <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.deviceCategory, { color: theme.text }]}>Loading device...</Text>
        <ActivityIndicator size="large" color={theme.text} />
       </View>
     </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
        <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
          <Text style={[styles.deviceCategory, { color: theme.text }]}>
            Error loading configuration. Please try again later.
          </Text>
        </View>
      </View>
    );
  }

  // Card Data Not Found
  if (!cardData) {
    return (
      <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
        <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
          <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]}>
            Device not found
          </Text>
        </View>
      </View>
    );
  }

  const firstOption = cardData.Settings && cardData.Settings.length > 0 ? cardData.Settings[0] : null;
  const hasSettings = firstOption !== null;

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
      {/* Header Section */}
      <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        {cardData.iconlib === 'WpIcons' ? (
          <WpIcons name={cardData.classIcon as any} style={styles.Wrappericon} color={theme.whiteText} />
        ) : (
          <MaterialCommunityIcons name={cardData.classIcon as any} style={styles.Wrappericon} color={theme.whiteText} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]}>
            {cardData.class}
          </Text>
          <Text style={[styles.deviceTitle, { color: theme.selected }]}>
            {cardData.title}
          </Text>
        </View>
        {cardData.Alarms && cardData.Alarms.length > 0 && (
          <Ionicons name='warning' style={[styles.Wrappericon, { opacity: blink ? 1 : 0.5 }]} color={theme.notification} />
        )}
      </View>

      {/* Enclosed Main Content */}
      <View style={{ flexDirection: 'column', justifyContent: 'space-around', paddingVertical: 10, gap: 15 ,flexGrow: 1}}>
        {/* Status Segment */}
        <View style={styles.status}>
          <Text style={[styles.statustext, { color: theme.text }]}>{cardData.status}</Text>
        </View>

        {/* Main segment */}
        <View style={styles.layout}>
          {Array.isArray(cardData.Specifications.summary) && cardData.Specifications.summary.map((section, sectionIdx) => {
            const [sectionName, items] = Object.entries(section)[0];

            const renderItems = (items: any[], isGroup: boolean = false) => (
              items.map((value: { value: string; unit?: string }, idx: number) => (
                <Text key={idx} style={[styles.text, { color: theme.text }]}>
                  {value.value}
                  <Text style={styles.unit}>{value.unit || ''}</Text>
                </Text>
              ))
            );

            if (sectionName.toLowerCase() === 'classicon' && Array.isArray(items)) {
              return (
                <View key={sectionIdx} style={[styles.layoutItem]}>
                  {cardData.iconlib === 'WpIcons' ? (
                    <WpIcons name={cardData.classIcon as any} size={85} color={theme.invertbackground} />
                  ) : (
                    <MaterialCommunityIcons name={cardData.classIcon as any} size={85} color={theme.invertbackground} />
                  )}
                  {renderItems(items)}
                </View>
              );
            }
            if (sectionName.toLowerCase() === 'group' && Array.isArray(items)) {
              return (
                <View key={sectionIdx} style={[styles.layoutItem, { flexDirection: 'column', flexShrink: 1 }]}>
                  {items.map((groupItem, groupIdx) => {
                    const [groupName, groupValues] = Object.entries(groupItem)[0];
                    return (
                      <View key={groupIdx} style={{ marginBottom: 10 }}>
                  <Text style={[styles.deviceCategory, { color: theme.text }]}>{groupName}</Text>
                  {Array.isArray(groupValues) && renderItems(groupValues)}
                      </View>
                    );
                  })}
                </View>
              );
            }

            return (
              <View key={sectionIdx} style={styles.layoutItem}>
                <Text style={[styles.deviceCategory, { color: theme.text }]}>{sectionName}</Text>
                {renderItems(items)}
              </View>
            );
          })}
        </View>

        {/* Bottom segment */}
        <View style={styles.buttonContainer}>
          {hasSettings && (
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.border }]} onPress={() => setModalVisible(true)}>
            <Text style={[styles.buttonText, { color: theme.text }]}>Settings</Text>
          </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.border }]} onPress={handlePress}>
            <Text style={[styles.buttonText, { color: theme.text }]}>More <Ionicons name='open' /></Text>
          </TouchableOpacity>
        </View>

        {/* Custom Modal View */}
        {modalVisible && hasSettings && (
          <View style={[styles.modalWrapper, { backgroundColor: theme.border }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {firstOption?.label}
            </Text>
            <Text style={[styles.text, { color: theme.text, backgroundColor: theme.background, padding: 15, borderRadius: 8 }]}>
              {firstOption?.value}
              <Text style={styles.unit}>{firstOption?.unit || ''}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              {firstOption?.buttons?.map((value, idx) => (
                firstOption?.settingtype?.toLowerCase() === 'button' ? (
                  <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: theme.card }]}
                    onPress={() => handleButtonPress(value.name)}
                  >
                    {loadingButton === value.name ? (
                      <ActivityIndicator size="small" color={theme.text} />
                    ) : (
                      <Text style={[styles.buttonText, { color: theme.text }]}>{value.name}</Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: theme.card }]}>
                    <Text style={[styles.buttonText, { color: theme.text }]}>{value.name}</Text>
                  </TouchableOpacity>
                )
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
    fontSize: 16,
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
  
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  layoutItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    alignItems: 'center',
  },
  statustext: {
    fontSize: 20,
    fontWeight: 'bold',
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
