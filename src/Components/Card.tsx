import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import WpIcons from '../icons/WhisperPowerIconLib';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import { useFetchConfig } from './CustomFunctions';


interface DynamicCardProps {
  ID: string;
  collapsible: boolean;
  hidden?: boolean;
  scale: number;
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

export default function DynamicCard ({ ID, collapsible, hidden, scale}: DynamicCardProps) {
  // Hook Calls
  const theme = useTheme(); // Fetch theme
  const { loading, config, error } = useFetchConfig(); // Fetch configuration
  const { width, height } = useWindowDimensions();


  // Find the card data once configuration is loaded
  const cardData = config?.system?.devices?.find(item => item.ID === ID) || null;
  const firstOption = cardData?.Settings?.find(setting => setting.showAsFirstSetting) || null;
  const hasSettings = firstOption !== null;

  // States
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
    <View style={{minWidth: 320,width: 320 * scale, aspectRatio: 2/1}}>
        <View style={{flex: 1,}}></View>
        <View style={{flex: 3,}}></View>
        <View style={{flex: 1,}}></View>
    </View>
  );

  const renderLoadingState = () => (
    <View style={{minWidth: 320,width: 320 * scale, aspectRatio: 2/1, backgroundColor: theme.card}}>
    <View style={{flex: 1, backgroundColor: theme.whisperGreen}}>

    </View>
    <View style={{flex: 3, justifyContent: 'space-between', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
            <ActivityIndicator size={100}/>
        </View>
        <View style={{flex: 1}}>
            <ActivityIndicator size={100}/>
        </View>
        <View style={{flex: 1}}>
            <ActivityIndicator size={100}/>
        </View>
    </View>
    <View style={{flex: 1, backgroundColor: theme.whisperGreen}}>

    </View>
</View>
  );

  const renderButtons = () => (
    <View style={{flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',}}>
      {hasSettings && (
        <TouchableOpacity style={[{flex: 1, alignItems: 'center', borderRadius: 8 * scale, margin: 8 * scale, backgroundColor: theme.whisperGreen}]} onPress={() => setModalVisible(true)}>
          <Text style={[{fontSize: 16 * scale,fontWeight: 'bold', color: theme.whiteText}]}>Settings</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[{flex: 1, alignItems: 'center', borderRadius: 8 * scale, margin: 8 * scale, backgroundColor: theme.whisperGreen}]} onPress={goToDevice}>
        <Text style={[{fontSize: 16 * scale,fontWeight: 'bold', color: theme.whiteText}]}>More <Ionicons name='open' /></Text>
      </TouchableOpacity>
    </View>
  );

  if (isHidden) return HiddenCard();
  if (loading || error || !cardData) return renderLoadingState();

  return (
    <View style={{minWidth: 320, width: 320 * scale, aspectRatio: 2/1, borderRadius: 8 * scale, overflow: 'hidden',backgroundColor: theme.card}}>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: theme.whisperGreen, }}>
            <WpIcons name={cardData.classIcon} style={{alignSelf: 'center', fontSize: 30 * scale}} color={theme.whiteText}/>
            <View>
            <Text style={{color: theme.whiteText, fontSize: 15 * scale}} lineBreakMode='tail' numberOfLines={1}>{cardData.class}</Text>
            <Text style={{color: theme.whiteText, fontSize: 15 * scale}} lineBreakMode='tail' numberOfLines={1}>{cardData.title} - if the title is too long it wil break offff ffffffffffffff</Text>
            </View>
        </View>
        <View style={{flex: 3, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
            </View>
            <View style={{flex: 1}}>

            </View>
            <View style={{flex: 1}}>
            </View>
        </View>
        <View style={{flex: 1,}}>
            {renderButtons()}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

