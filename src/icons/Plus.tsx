import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPlus = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M17.333 5.333h-2.667v9.333H5.333v2.667h9.333v9.333h2.667v-9.333h9.333v-2.667h-9.333z" />
  </Svg>
);
export default SvgPlus;
