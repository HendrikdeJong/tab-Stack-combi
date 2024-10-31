import React from 'react';
import { View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

// Import icons (ensure all are generated with SVGR using react-native-svg)
import Icon1 from './AcGrid';
import Icon2 from './AcIn';
import Icon3 from './AcOut';
import Icon4 from './Battery';
import Icon5 from './Battery1';
import Icon6 from './Battery2';
import Icon7 from './Battery3';
import Icon8 from './Battery4';
import Icon9 from './Battery5';
import Icon10 from './Battery6';
import Icon11 from './BatteryBig';
import Icon12 from './BatteryPower';
import Icon13 from './Bell';
import Icon14 from './Bulb';
import Icon15 from './Charger';
import Icon16 from './CheckBold';
import Icon17 from './Check';
import Icon18 from './ChevronDown';
import Icon19 from './ChevronLeft';
import Icon20 from './ChevronRight';
import Icon21 from './ChevronUp';
import Icon22 from './Close';
import Icon23 from './Combi';
import Icon24 from './Connector';
import Icon25 from './DarkMode';
import Icon26 from './Delete';
import Icon27 from './Edit';
import Icon28 from './Generator';
import Icon29 from './Grid';
import Icon30 from './Info';
import Icon31 from './Inverter';
import Icon32 from './LightMode';
import Icon33 from './Lightning';
import Icon34 from './List';
import Icon35 from './Loading1';
import Icon36 from './Loading2';
import Icon37 from './Loading3';
import Icon38 from './Loading4';
import Icon39 from './Loading5';
import Icon40 from './LoadingBar1';
import Icon41 from './LoadingBar2';
import Icon42 from './LoadingBar3';
import Icon43 from './LoadingBar4';
import Icon44 from './LoadingBar5';
import Icon45 from './LoadingCircle';
import Icon46 from './Lock';
import Icon47 from './Menu';
import Icon48 from './Minus';
import Icon49 from './More';
import Icon50 from './Offline';
import Icon51 from './Piccolo';
import Icon52 from './Plug';
import Icon53 from './Plus';
import Icon54 from './Pmg';
import Icon55 from './PowerCube';
import Icon56 from './PowerOutlet';
import Icon57 from './QuestionCircle';
import Icon58 from './Settings';
import Icon59 from './Sinus';
import Icon60 from './SolarCharger';
import Icon61 from './SolarPanel';
import Icon62 from './Solar';
import Icon63 from './Sq';
import Icon64 from './Sun';
import Icon65 from './Time';
import Icon66 from './WarningTriangle';
import Icon67 from './Warning1';

// Create a map for easier access
const iconMap: { [key: string]: React.FC<SvgProps> } = {
  acGrid: Icon1,
  acIn: Icon2,
  acOut: Icon3,
  battery: Icon4,
  battery1: Icon5,
  battery2: Icon6,
  battery3: Icon7,
  battery4: Icon8,
  battery5: Icon9,
  battery6: Icon10,
  batteryBig: Icon11,
  batteryPower: Icon12,
  bell: Icon13,
  bulb: Icon14,
  charger: Icon15,
  checkBold: Icon16,
  check: Icon17,
  chevronDown: Icon18,
  chevronLeft: Icon19,
  chevronRight: Icon20,
  chevronUp: Icon21,
  close: Icon22,
  combi: Icon23,
  connector: Icon24,
  darkMode: Icon25,
  delete: Icon26,
  edit: Icon27,
  generator: Icon28,
  grid: Icon29,
  info: Icon30,
  inverter: Icon31,
  lightMode: Icon32,
  lightning: Icon33,
  list: Icon34,
  loading1: Icon35,
  loading2: Icon36,
  loading3: Icon37,
  loading4: Icon38,
  loading5: Icon39,
  loadingBar1: Icon40,
  loadingBar2: Icon41,
  loadingBar3: Icon42,
  loadingBar4: Icon43,
  loadingBar5: Icon44,
  loadingCircle: Icon45,
  lock: Icon46,
  menu: Icon47,
  minus: Icon48,
  more: Icon49,
  offline: Icon50,
  piccolo: Icon51,
  plug: Icon52,
  plus: Icon53,
  pmg: Icon54,
  powerCube: Icon55,
  powerOutlet: Icon56,
  questionCircle: Icon57,
  settings: Icon58,
  sinus: Icon59,
  solarCharger: Icon60,
  solarPanel: Icon61,
  solar: Icon62,
  sq: Icon63,
  sun: Icon64,
  time: Icon65,
  warningTriangle: Icon66,
  warning1: Icon67,
};

// Define Props for CustomIconLibrary
type CustomIconLibraryProps = {
  name: keyof typeof iconMap; // This will ensure TypeScript suggests only valid keys
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const WpIcons: React.FC<CustomIconLibraryProps> = ({
  name,
  size,
  color = 'black',
  style,
}) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.warn(`Icon ${name} not found in library`);
    return <View style={style} />; // Return an empty view if the icon does not exist
  }

  const flattenedStyle = StyleSheet.flatten(style);
  const computedSize = size ?? (flattenedStyle as TextStyle)?.fontSize ?? 24; // If size is not provided, fallback to fontSize from style, then 24

  return (
    <View style={style}>
      <IconComponent width={computedSize} height={computedSize} fill={color} />
    </View>
  );
};

export default WpIcons;
