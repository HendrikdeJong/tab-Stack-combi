import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgMore = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M29.333 16a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0M18.667 16a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0M8 16a2.667 2.667 0 1 1-5.334 0A2.667 2.667 0 0 1 8 16" />
  </Svg>
);
export default SvgMore;
