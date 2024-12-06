import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import WpIcons from '../icons/WhisperPowerIconLib';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import { useFetchConfig } from './CustomFunctions';
import Collapsible from 'react-native-collapsible';

interface DynamicCardProps {
  ID: string;
  hidden?: boolean;
  numColumns?: number
}

interface ButtonPressHandler {
  (buttonName: string): void;
}

interface SectionItem {
  value: string;
  unit?: string;
}

interface GroupItem {
  [key: string]: SectionItem[];
}

export default function DynamicCard ({ ID, hidden, numColumns }: DynamicCardProps) {
  // Hook Calls
  const theme = useTheme(); // Fetch theme
  const { loading, config, error } = useFetchConfig(); // Fetch configuration

  // Find the card data once configuration is loaded
  const cardData = config?.system?.devices?.find(item => item.ID === ID) || null;
  const firstOption = cardData?.Settings?.find(setting => setting.showAsFirstSetting) || null;
  const hasSettings = firstOption !== null;

  // States
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const collapsible = numColumns === 1
  const [collapsed, setCollapsed] = useState(collapsible);
  const [isHidden, setIsHidden] = useState(hidden);

  // UseEffect for blinking warning icon
  useEffect(() => {
    const interval = setInterval(() => setBlink(prev => !prev), 800);
    return () => clearInterval(interval);
  }, []);

  const handleButtonPress: ButtonPressHandler = (buttonName) => {
    setLoadingButton(buttonName);
    setTimeout(() => setLoadingButton(null), Math.random() * 3600);
  };

  const goToDevice = () => {
    router.push(`/Devices/${ID}/`);
  };

  const HiddenCard = () => (
    <View style={[styles.cardContainer, styles.transparentCard]}>
        <View style={[styles.headerWrapper, styles.transparent]}>
          <Text style={[styles.deviceCategory, styles.transparentText]}>this should be hidden</Text>
        </View>
        <View style={[styles.layout, { height: 100 }]}>
          <ActivityIndicator size="large" color="transparent" />
        </View>
        <View style={styles.buttonContainer}>
          <View style={[styles.button, styles.transparent]} />
          <View style={[styles.button, styles.transparent]} />
        </View>
      </View>
  );

  const renderLoadingState = () => (
    <View style={[styles.cardContainer, { backgroundColor: theme.card, justifyContent: 'space-between', paddingBottom: 10 }]}>
      <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.deviceCategory, { color: theme.whiteText }]}>Loading device...</Text>
      </View>
      <View style={[styles.layout, { height: 100 }]}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={[styles.button, { backgroundColor: theme.border, minHeight: 30 }]} />
        <View style={[styles.button, { backgroundColor: theme.border, minHeight: 30 }]} />
      </View>
    </View>
  );

  const renderErrorState = () => (
    <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
      <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.deviceCategory, { color: theme.text }]}>Error loading configuration. Please try again later.</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
      <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
        <Text style={[styles.deviceCategory, { color: theme.whiteText }]}>Device not found</Text>
      </View>
    </View>
  );


  const renderMainContent = () => (
    cardData != null &&
    <View style={styles.MainContentContainer}>
      <View style={styles.status}>
        <Text style={[styles.statustext, { color: theme.text }]}>{cardData.status}</Text>
      </View>
      <View style={styles.layout}>
        {Array.isArray(cardData.Specifications.summary) && cardData.Specifications.summary.map((section, sectionIdx) => {
          const [sectionName, items] = Object.entries(section)[0];
          return renderSection(sectionName, items, sectionIdx);
        })}
      </View>
      {renderButtons()}
      {renderModal()}
    </View>
  );

  const renderSection = (sectionName: string, items: SectionItem[] | GroupItem[], sectionIdx: number) => {
    const renderItems = (items: SectionItem[]) => items.map((value, idx) => (
      <Text key={idx} style={[styles.text, { color: theme.text }]}> {value.value}<Text style={styles.unit}>{value.unit || ''}</Text></Text>
    ));

    if (sectionName.toLowerCase() === 'classicon' && Array.isArray(items)) {
      return (
        <View key={sectionIdx} style={styles.layoutItem}>
          {cardData && cardData.iconlib === 'WpIcons' ? (
            <WpIcons name={cardData.classIcon} size={85} color={theme.invertbackground} />
          ) : (
            <MaterialCommunityIcons name={cardData?.classIcon as any} size={85} color={theme.invertbackground} />
          )}
          {renderItems(items as SectionItem[])}
        </View>
      );
    }

    if (sectionName.toLowerCase() === 'group' && Array.isArray(items)) {
      return (
        <View key={sectionIdx} style={[styles.layoutItem, { flexDirection: 'column', flexShrink: 1 }]}>
          {(items as GroupItem[]).map((groupItem, groupIdx) => {
            const [groupName, groupValues] = Object.entries(groupItem)[0];
            return (
              <View key={groupIdx} style={{ marginBottom: 10 }}>
                <Text style={[styles.deviceCategory, { color: theme.subtext }]}>{groupName}</Text>
                {Array.isArray(groupValues) && renderItems(groupValues)}
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <View key={sectionIdx} style={styles.layoutItem}>
        <Text style={[styles.deviceCategory, { color: theme.subtext }]}>{sectionName}</Text>
        {renderItems(items as SectionItem[])}
      </View>
    );
  };

  const renderButtons = () => (
    <View style={styles.buttonContainer}>
      {hasSettings && (
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.whisperGreen }]} onPress={() => setModalVisible(true)}>
          <Text style={[styles.buttonText, { color: theme.whiteText}]}>Settings</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.button, {backgroundColor: theme.whisperGreen }]} onPress={goToDevice}>
        <Text style={[styles.buttonText, { color: theme.whiteText}]}>More <Ionicons name='open' /></Text>
      </TouchableOpacity>
    </View>
  );

  const renderModal = () => (
    modalVisible && hasSettings && (
      <View style={[styles.modalWrapper, { backgroundColor: theme.border }]}>
        <Text style={[styles.modalTitle, { color: theme.text }]}>{firstOption?.label}</Text>
        <Text style={[styles.text, { color: theme.text, backgroundColor: theme.background, padding: 15, borderRadius: 8 }]}>{firstOption?.value}<Text style={styles.unit}>{firstOption?.unit || ''}</Text></Text>
        <View style={styles.buttonContainer}>
          {firstOption?.buttons?.map((value, idx) => (
            <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: theme.whisperGreen }]} onPress={() => handleButtonPress(value.name)}>
              {loadingButton === value.name ? (
                <ActivityIndicator size="small" color={theme.whiteText} />
              ) : (
                <Text style={[styles.buttonText, { color: theme.whiteText }]}>{value.name}</Text>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.whisperGreen }]} onPress={() => setModalVisible(false)}>
            <Text style={[styles.buttonText, { color: theme.whiteText }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
  

  if (isHidden) return HiddenCard();
  if (loading) return renderLoadingState();
  if (error) return renderErrorState();
  if (!cardData) return renderEmptyState();

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
      <TouchableOpacity style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen,}]} onPress={() => setCollapsed((prev: any) => !prev)}>
        {cardData.iconlib === 'WpIcons' ? (
          <WpIcons name={cardData.classIcon} style={styles.Wrappericon} color={theme.whiteText} />
        ) : (
          <MaterialCommunityIcons name={cardData.classIcon as any} style={styles.Wrappericon} color={theme.whiteText} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]}>{cardData.class}</Text>
          <Text style={[styles.deviceTitle, { color: theme.selected,}]} lineBreakMode='tail' numberOfLines={1}>{cardData.title}</Text>
        </View>
        {collapsible &&
          <TouchableOpacity style={{padding: 12}} onPress={() => setCollapsed((prev: any) => !prev)}>
            {collapsed ? <Ionicons name='chevron-down' size={24} color={theme.whiteText} /> : <Ionicons name='chevron-up' size={24} color={theme.whiteText} />}
          </TouchableOpacity>
        }
        </TouchableOpacity>
        {collapsible ? <Collapsible collapsed={collapsed}>{renderMainContent()}</Collapsible> : renderMainContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    minWidth: 320,
    maxWidth: 640,
    flex: 1,
    overflow: 'hidden',
  },
  headerWrapper: {
    padding: 12,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  MainContentContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 16,
    flexBasis: 280,
    flex: 1,
  },

  Wrappericon: {
    fontSize: 48,
  },
  deviceCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceTitle: {
    fontSize: 24,
  },
  unit: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  
  layout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  layoutItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    paddingTop: 8,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transparentCard: {
    backgroundColor: 'transparent',
    opacity: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  transparentText: {
    color: 'transparent',
  },
});

