import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import WpIcons from '../icons/WhisperPowerIconLib';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import { useFetchConfig } from './CustomFunctions';
import Collapsible from 'react-native-collapsible';
import {scale, ModerateScale, ModerateVerticalScale, VerticalScale, verticalScale} from 'react-native-size-matters';

interface DynamicCardProps {
  ID: string;
  hidden?: boolean;
  numColumns: number
  Iscollapsible?: boolean;
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

export default function DynamicCard ({ ID, hidden, numColumns, Iscollapsible }: DynamicCardProps) {
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
  const collapsible = Iscollapsible ?  numColumns === 1 : false;
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

  function RenderState(message: string, RenderStateHidden : boolean, showloadingbar: boolean){
    return(
      <View style={[styles.cardContainer, RenderStateHidden? styles.transparentCard: {},{ backgroundColor: theme.card }]}>
        <View style={[styles.headerWrapper, RenderStateHidden? styles.transparent: {},{ backgroundColor: theme.whisperGreen }]}>
          <Text style={[styles.deviceCategory, RenderStateHidden? styles.transparentText: {},{ color: theme.text }]}>{message}</Text>
        </View>
        <View style={[styles.layout, { flex: 1 }]}>
          {showloadingbar? 
          <ActivityIndicator size="large" color={RenderStateHidden? 'transparent' : theme.text}/>:<Text style={[styles.deviceCategory, RenderStateHidden? styles.transparentText: {},{ color: theme.text }]}>{message}</Text>
          }
        </View>
      </View>
    );
  }

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
      {collapsible &&
      renderButtons()}
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
            <WpIcons name={cardData.classIcon} style={styles.classIcon} color={theme.invertbackground} />
          ) : (
            <MaterialCommunityIcons name={cardData?.classIcon as any} style={styles.classIcon} color={theme.invertbackground} />
          )}
          {renderItems(items as SectionItem[])}
        </View>
      );
    }

    if (sectionName.toLowerCase() === 'group' && Array.isArray(items)) {
      return (
        <View key={sectionIdx} style={[styles.layoutItem]}>
          {(items as GroupItem[]).map((groupItem, groupIdx) => {
            const [groupName, groupValues] = Object.entries(groupItem)[0];
            return (
              <View key={groupIdx}>
                <Text style={[styles.deviceCategory, { color: theme.subtext }]} lineBreakMode='tail' numberOfLines={1}>{groupName}</Text>
                {Array.isArray(groupValues) && renderItems(groupValues)}
              </View>
            );
          })}
        </View>
      );
    }

    return (
      <View key={sectionIdx} style={styles.layoutItem}>
        <Text style={[styles.deviceCategory, { color: theme.subtext }]} lineBreakMode='tail' numberOfLines={1}>{sectionName}</Text>
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
        <Text style={[styles.buttonText, { color: theme.whiteText}]}>More <Ionicons style={styles.buttonText} name='open' /></Text>
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
                <ActivityIndicator size={styles.buttonText.fontSize} color={theme.whiteText} />
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

  const renderHeader = () => (
    cardData &&
    <TouchableOpacity style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen,}]} onPress={() => setCollapsed((prev: any) => !prev)}>
      {cardData.iconlib === 'WpIcons' ? (
        <WpIcons name={cardData.classIcon} style={styles.Wrappericon} color={theme.whiteText} />
      ) : (
        <MaterialCommunityIcons name={cardData.classIcon as any} style={styles.Wrappericon} color={theme.whiteText} />
      )}
      <View style={{ flex: 3 }}>
        <Text style={[styles.deviceCategory, { color: theme.whiteText, borderColor: theme.selected }]} lineBreakMode='tail' numberOfLines={1}>{cardData.class}</Text>
        <Text style={[styles.deviceTitle, { color: theme.selected,}]} lineBreakMode='tail' numberOfLines={1}>{cardData.title}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {!collapsible && hasSettings && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="settings-outline" style={styles.Wrappericon} color={theme.whiteText} />
          </TouchableOpacity>
        )}
        {!collapsible && (
          <TouchableOpacity onPress={goToDevice}>
            <Ionicons name="ellipsis-horizontal-circle-outline" style={styles.Wrappericon} color={theme.whiteText} />
          </TouchableOpacity>
        )}
        {collapsible && (
          <TouchableOpacity onPress={() => setCollapsed((prev: any) => !prev)}>
            {collapsed ? (
              <Ionicons name="chevron-down-circle-outline" style={styles.Wrappericon} color={theme.whiteText} />
            ) : (
              <Ionicons name="chevron-up-circle-outline" style={styles.Wrappericon} color={theme.whiteText} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  

  if (isHidden) return RenderState('should be hidden', true, false);
  if (loading) return RenderState('loading device', false, true);
  if (!cardData) return RenderState('Device not found', false, false);
  if (error) return RenderState('a problem acurred during loading configuration. Please try again.', false, false);

  return (
    <View style={[styles.cardContainer, { backgroundColor: theme.card,}]}>
        {renderHeader()}
        {collapsible ? <Collapsible collapsed={collapsed}>{renderMainContent()}</Collapsible> : renderMainContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Math.max(verticalScale(8), 4),
    minWidth: 320,
    maxWidth: verticalScale(400),
    flex: 1, 
    overflow: 'hidden',
  },
  headerWrapper: {
    padding: Math.max(verticalScale(6), 8),
    gap: Math.max(verticalScale(6), 8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  MainContentContainer: {
    justifyContent: 'space-evenly',
    paddingVertical: Math.max(verticalScale(8), 4),
    gap: Math.max(verticalScale(8), 4),
    flex: 1,
  },
  Wrappericon: {
    fontSize: Math.max(verticalScale(24), 16),
  },
  classIcon: {
    fontSize: Math.max(verticalScale(36), 24),
  },
  deviceCategory: {
    fontSize: Math.max(verticalScale(8), 12),
    fontWeight: 'bold',
  },
  deviceTitle: {
    fontSize: Math.max(verticalScale(12), 12),
  },
  unit: {
    fontSize: Math.max(verticalScale(6), 6),
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
    paddingTop: Math.max(verticalScale(8), 4),
    alignItems: 'center',
  },
  statustext: {
    fontSize: Math.max(verticalScale(12), 10),
    fontWeight: 'bold',
  },
  text: {
    fontSize: Math.max(verticalScale(12), 12),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: Math.max(verticalScale(5), 4),
    paddingVertical: Math.max(verticalScale(5), 4),
    borderRadius: Math.max(verticalScale(5), 4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Math.max(verticalScale(12), 8),
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
    padding: Math.max(verticalScale(16), 12),
    borderBottomStartRadius: Math.max(verticalScale(8), 4),
    borderBottomEndRadius: Math.max(verticalScale(8), 4),
  },
  modalTitle: {
    fontSize: Math.max(verticalScale(12), 16),
    fontWeight: 'bold',
    marginBottom: Math.max(verticalScale(20), 12),
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
