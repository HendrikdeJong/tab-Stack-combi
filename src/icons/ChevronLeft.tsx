import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgChevronLeft = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="m19.448 26.667 1.886-1.886-8.485-8.485 8.485-8.485-1.886-1.886L9.077 16.296z" />
  </Svg>
);
export default SvgChevronLeft;
