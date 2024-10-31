import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgList = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M4 17.333h2.667v-2.667H4zm0 5.334h2.667V20H4zM4 12h2.667V9.333H4zm5.333 5.333H28v-2.667H9.333zm0 5.334H28V20H9.333zm0-13.334V12H28V9.333z" />
  </Svg>
);
export default SvgList;
