import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgChevronDown = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="m5.333 12.552 1.886-1.886 8.485 8.485 8.485-8.485 1.886 1.886-10.371 10.371z" />
  </Svg>
);
export default SvgChevronDown;
