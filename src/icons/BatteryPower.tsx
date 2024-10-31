import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgBatteryPower = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M29.09 6.75h-.66v-.66a2.65 2.65 0 0 0-2.64-2.64h-3.17a2.65 2.65 0 0 0-2.64 2.64v.66h-8.2v-.66a2.65 2.65 0 0 0-2.64-2.64H5.97a2.65 2.65 0 0 0-2.64 2.64v.66h-.66A2.65 2.65 0 0 0 .03 9.39v16.53a2.65 2.65 0 0 0 2.64 2.64h26.71a2.65 2.65 0 0 0 2.64-2.64V9.39c-.26-1.45-1.45-2.64-2.91-2.64zm-5.42 9.39c-.79 1.06-6.61 9.79-6.61 9.79s-.26.66-1.19.53-.66-1.19-.66-1.19l1.72-6.48h-5.16s-1.06 0-.93-1.06l.93-7.8S11.9 9 13.09 9h5.69s1.06.13.66 1.32c-.53 1.19-1.59 4.23-1.59 4.23h5.02c0-.13 1.59.53.79 1.59z" />
  </Svg>
);
export default SvgBatteryPower;
