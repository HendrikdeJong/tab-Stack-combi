import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPiccolo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
     <Path d="M14.14 15.33h3.62c1 0 1.81 0.81 1.81 1.81v0.17c0 1-0.81 1.81-1.81 1.81h-3.62c-1 0-1.81-0.81-1.81-1.81v-0.17c0-1 0.81-1.81 1.81-1.81z"/>
     <Path d="M15.95 2.080c-8.81 0-15.95 3.080-15.95 6.9v17.35c0 1.15 0.93 2.080 2.070 2.080h27.76c1.15 0 2.070-0.93 2.070-2.080v-17.35c0-3.81-7.14-6.9-15.95-6.9zM2.17 9.71c0-0.25 0.040-0.49 0.11-0.73 0.41-1.3 1.9-2.45 4.090-3.3v15.76h-4.2v-11.73zM9.65 4.71c1.88-0.41 4.020-0.63 6.29-0.63s4.42 0.22 6.3 0.63v16.72h-12.59v-16.72zM29.71 21.43h-4.2v-15.75c2.18 0.86 3.68 2.010 4.090 3.3 0.070 0.24 0.11 0.48 0.11 0.73v11.73z"/>
  </Svg>
);
export default SvgPiccolo;
