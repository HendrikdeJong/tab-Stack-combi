import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgEdit = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M2.667 2.667h14.667v2.667h-12v21.333h21.333v-12h2.667v14.667H2.667zm26.465 4.262-1.886 1.886-3.771-3.771 1.886-1.886zm-6.599-.943 3.771 3.771L14.99 21.071 11.219 17.3zm-8.486 16.028-4.714.943.943-4.714z" />
  </Svg>
);
export default SvgEdit;
