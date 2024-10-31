import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPowerCube = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M2.667 1.333c-.736 0-1.333.597-1.333 1.333v26.667c0 .736.597 1.333 1.333 1.333h26.667c.736 0 1.333-.597 1.333-1.333V2.666c0-.736-.597-1.333-1.333-1.333zm6.666 16.8 7.407-12.8-.741 8.533h6.667l-7.407 12.8.741-8.533z" />
  </Svg>
);
export default SvgPowerCube;
