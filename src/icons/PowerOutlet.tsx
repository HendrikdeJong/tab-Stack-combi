import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPowerOutlet = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M16 0C7.17 0 0 7.17 0 16s6.96 15.8 15.62 15.99h.01c.13.01.24.01.37.01s.24 0 .37-.01h.01C25.04 31.8 32 24.71 32 16S24.83 0 16 0m1.9 29.13v-2.88a1.9 1.9 0 1 0-3.8 0v2.88C7.67 28.22 2.73 22.68 2.73 16S7.67 3.78 14.1 2.86v2.92a1.9 1.9 0 1 0 3.8 0V2.86c6.43.92 11.39 6.46 11.39 13.14S24.34 28.22 17.9 29.13" />
    <Path d="M12.36 15.99a2.94 2.94 0 1 1-5.88 0 2.94 2.94 0 0 1 5.88 0M25.54 15.99a2.94 2.94 0 1 1-5.88 0 2.94 2.94 0 0 1 5.88 0" />
  </Svg>
);
export default SvgPowerOutlet;
