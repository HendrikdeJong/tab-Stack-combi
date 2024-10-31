import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgInfo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M16 0C7.16 0 0 7.16 0 16s7.16 16 16 16 16-7.16 16-16S24.84 0 16 0m-2.33 7.02c0-1.04.51-1.55 1.55-1.55h1.67c1.04 0 1.55.51 1.55 1.55v.71c0 1.04-.51 1.55-1.55 1.55h-1.67c-1.04 0-1.55-.51-1.55-1.55zm4.83 17.11c0 1.03-.51 1.55-1.55 1.55h-1.78c-1.04 0-1.55-.53-1.55-1.55V12.67c0-1.03.51-1.55 1.55-1.55h1.78c1.04 0 1.55.53 1.55 1.55z" />
  </Svg>
);
export default SvgInfo;
