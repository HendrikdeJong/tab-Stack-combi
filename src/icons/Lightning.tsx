import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLightning = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="m4.01 15.98 1.8-14.27S5.96 0 8.18 0h10.37s2 .18 1.13 2.44-2.88 7.68-2.88 7.68h9.17s2.98 1.13 1.53 3.17-12.05 17.8-12.05 17.8-.58 1.13-2.15.88-1.24-2.19-1.24-2.19l3.09-11.87H5.77s-1.99-.09-1.76-1.93" />
  </Svg>
);
export default SvgLightning;
