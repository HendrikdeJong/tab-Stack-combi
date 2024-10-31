import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgTime = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path d="M16.01 0C7.17 0 0 7.16 0 15.99S7.17 32 16.01 32 32 24.83 32 15.99 24.84 0 16.01 0m9.93 17.81H15.9c-1 0-1.82-.8-1.82-1.82V5.96c0-1 .82-1.82 1.82-1.82s1.82.82 1.82 1.82v8.21h8.23c1 0 1.82.82 1.82 1.82s-.82 1.82-1.82 1.82z" />
  </Svg>
);
export default SvgTime;
