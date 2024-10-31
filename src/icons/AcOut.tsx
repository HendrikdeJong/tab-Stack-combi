import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgAcOut = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M1.333 16.211c0 7.792 5.858 14.191 13.333 14.877v-4.482h2.667v4.482c7.475-.686 13.333-7.085 13.333-14.877S24.808 2.02 17.333 1.334v3.939h-2.667V1.334C7.191 2.02 1.333 8.419 1.333 16.211M10.667 16a2 2 0 1 1-3.999.001A2 2 0 0 1 10.667 16m12.666 2a2 2 0 1 1-.001-3.999A2 2 0 0 1 23.333 18" />
  </Svg>
);
export default SvgAcOut;
