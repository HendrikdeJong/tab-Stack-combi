import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import WpIcons from '../icons/WhisperPowerIconLib';
import { useTheme } from '../Styling/Theme';
import { router } from 'expo-router';
import { useFetchConfig } from './CustomFunctions';
import Collapsible from 'react-native-collapsible';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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

//   const renderErrorState = () => (
//     <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
//       <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
//         <Text style={[styles.deviceCategory, { color: theme.text }]}>Error loading configuration. Please try again later.</Text>
//       </View>
//     </View>
//   );

//   const renderEmptyState = () => (
//     <View style={[styles.cardContainer, { backgroundColor: theme.card }]}>
//       <View style={[styles.headerWrapper, { backgroundColor: theme.whisperGreen }]}>
//         <Text style={[styles.deviceCategory, { color: theme.whiteText }]}>Device not found</Text>
//       </View>
//     </View>
//   );


//   const renderMainContent = () => (
//     cardData != null &&
//     <View style={styles.MainContentContainer}>
//       <View style={styles.status}>
//         <Text style={[styles.statustext, { color: theme.text }]}>{cardData.status}</Text>
//       </View>
//       <View style={styles.layout}>
//         {Array.isArray(cardData.Specifications.summary) && cardData.Specifications.summary.map((section, sectionIdx) => {
//           const [sectionName, items] = Object.entries(section)[0];
//           return renderSection(sectionName, items, sectionIdx);
//         })}
//       </View>
//       {renderButtons()}
//       {renderModal()}
//     </View>
//   );

//   const renderSection = (sectionName: string, items: SectionItem[] | GroupItem[], sectionIdx: number) => {
//     const renderItems = (items: SectionItem[]) => items.map((value, idx) => (
//       <Text key={idx} style={[styles.text, { color: theme.text }]}> {value.value}<Text style={styles.unit}>{value.unit || ''}</Text></Text>
//     ));

//     if (sectionName.toLowerCase() === 'classicon' && Array.isArray(items)) {
//       return (
//         <View key={sectionIdx} style={styles.layoutItem}>
//           {cardData && cardData.iconlib === 'WpIcons' ? (
//             <WpIcons name={cardData.classIcon} size={85} color={theme.invertbackground} />
//           ) : (
//             <MaterialCommunityIcons name={cardData?.classIcon as any} size={85} color={theme.invertbackground} />
//           )}
//           {renderItems(items as SectionItem[])}
//         </View>
//       );
//     }

//     if (sectionName.toLowerCase() === 'group' && Array.isArray(items)) {
//       return (
//         <View key={sectionIdx} style={[styles.layoutItem, { flexDirection: 'column', flexShrink: 1 }]}>
//           {(items as GroupItem[]).map((groupItem, groupIdx) => {
//             const [groupName, groupValues] = Object.entries(groupItem)[0];
//             return (
//               <View key={groupIdx} style={{ marginBottom: 10 }}>
//                 <Text style={[styles.deviceCategory, { color: theme.subtext }]}>{groupName}</Text>
//                 {Array.isArray(groupValues) && renderItems(groupValues)}
//               </View>
//             );
//           })}
//         </View>
//       );
//     }

//     return (
//       <View key={sectionIdx} style={styles.layoutItem}>
//         <Text style={[styles.deviceCategory, { color: theme.subtext }]}>{sectionName}</Text>
//         {renderItems(items as SectionItem[])}
//       </View>
//     );
//   };

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

//   const renderModal = () => (
//     modalVisible && hasSettings && (
//       <View style={[styles.modalWrapper, { backgroundColor: theme.border }]}>
//         <Text style={[styles.modalTitle, { color: theme.text }]}>{firstOption?.label}</Text>
//         <Text style={[styles.text, { color: theme.text, backgroundColor: theme.background, padding: 15, borderRadius: 8 }]}>{firstOption?.value}<Text style={styles.unit}>{firstOption?.unit || ''}</Text></Text>
//         <View style={styles.buttonContainer}>
//           {firstOption?.buttons?.map((value, idx) => (
//             <TouchableOpacity key={idx} style={[styles.button, { backgroundColor: theme.whisperGreen }]} onPress={() => handleButtonPress(value.name)}>
//               {loadingButton === value.name ? (
//                 <ActivityIndicator size="small" color={theme.whiteText} />
//               ) : (
//                 <Text style={[styles.buttonText, { color: theme.whiteText }]}>{value.name}</Text>
//               )}
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity style={[styles.button, { backgroundColor: theme.whisperGreen }]} onPress={() => setModalVisible(false)}>
//             <Text style={[styles.buttonText, { color: theme.whiteText }]}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     )
//   );


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

