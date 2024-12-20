import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgBatteryBig = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M30.79 5.89h-2.17V3.62c0-.66-.54-1.2-1.2-1.2h-6.09c-.66 0-1.2.54-1.2 1.2v2.27h-8.26V3.62c0-.66-.54-1.2-1.2-1.2H4.58c-.66 0-1.2.54-1.2 1.2v2.27H1.2c-.66 0-1.2.54-1.2 1.2v19.48c0 .67.54 1.2 1.2 1.2h29.59c.67 0 1.21-.54 1.21-1.2V7.09c0-.67-.54-1.2-1.21-1.2m-18.5 10.43c0 .22-.18.39-.4.39h-3.4v3.41c0 .22-.17.39-.4.39h-.94c-.22 0-.39-.17-.39-.39v-3.41H3.35c-.22 0-.39-.17-.39-.39v-.94c0-.22.17-.4.39-.4h3.41v-3.4c0-.22.17-.4.39-.4h.94c.22 0 .4.18.4.4v3.4h3.4c.22 0 .4.18.4.4zm16.75 0c0 .22-.18.39-.4.39H20.1c-.22 0-.39-.17-.39-.39v-.94c0-.22.17-.4.39-.4h8.54c.22 0 .4.18.4.4z" />
  </Svg>
);
export default SvgBatteryBig;
