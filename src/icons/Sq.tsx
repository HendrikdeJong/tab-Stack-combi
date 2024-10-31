import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSq = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M29.82 6.07H2.09C.94 6.07 0 7.02 0 8.16v16.99c0 1.15.94 2.09 2.09 2.09h27.73c1.15 0 2.09-.94 2.09-2.09V8.17c0-1.14-.94-2.09-2.09-2.09zM18.09 21.54H1.78V8.58c0-.39.32-.71.71-.71h15.6zm12.03 0H21.6V7.87h7.8c.4 0 .71.32.71.71v12.96z" />
    <Path d="M24.32 10.65h3.08c.795 0 1.44.645 1.44 1.44v1.39a1.44 1.44 0 0 1-1.44 1.44h-3.08a1.44 1.44 0 0 1-1.44-1.44v-1.39c0-.795.645-1.44 1.44-1.44" />
  </Svg>
);
export default SvgSq;
