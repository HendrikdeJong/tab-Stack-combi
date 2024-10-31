import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMenu = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M5.333 17.333h21.333v-2.667H5.333zm0 6.667h21.333v-2.667H5.333zm0-16v2.667h21.333V8z" />
  </Svg>
);
export default SvgMenu;
