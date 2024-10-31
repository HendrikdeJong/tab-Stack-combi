import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDarkMode = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M2.667 16C2.667 8.64 8.64 2.667 16 2.667S29.333 8.64 29.333 16 23.36 29.333 16 29.333 2.667 23.36 2.667 16m20.752 5.701a9.34 9.34 0 0 0 1.914-4.86 7.28 7.28 0 0 1-9.468-.706 7.28 7.28 0 0 1-.706-9.468 9.361 9.361 0 0 0-7.936 6.136 9.356 9.356 0 0 0 6.761 12.306 9.354 9.354 0 0 0 9.435-3.408" />
  </Svg>
);
export default SvgDarkMode;
