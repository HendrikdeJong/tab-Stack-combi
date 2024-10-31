import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLoadingCircle = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M29.97 15.88c0 7.704-6.246 13.95-13.95 13.95S2.07 23.584 2.07 15.88 8.316 1.93 16.02 1.93s13.95 6.246 13.95 13.95" />
  </Svg>
);
export default SvgLoadingCircle;
