import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgClose = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M7.515 5.629 5.629 7.515 14.114 16l-8.485 8.485 1.886 1.886L16 17.886l8.485 8.485 1.886-1.886L17.886 16l8.485-8.485-1.886-1.886L16 14.114z" />
  </Svg>
);
export default SvgClose;
