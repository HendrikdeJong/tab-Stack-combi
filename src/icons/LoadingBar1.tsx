import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLoadingBar1 = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M21.64 3.24h-.61V1.71A1.7 1.7 0 0 0 19.33 0h-6.65c-.94 0-1.7.76-1.7 1.71v1.53h-.62c-1.89 0-3.41 1.53-3.41 3.41v21.92c0 1.89 1.53 3.43 3.41 3.43h11.27c1.89 0 3.41-1.54 3.41-3.43V6.65c0-1.89-1.53-3.41-3.41-3.41zm-.31 26.61H10.68c-.87 0-1.59-.72-1.59-1.59s.72-1.59 1.59-1.59h10.65c.87 0 1.59.7 1.59 1.59s-.72 1.59-1.59 1.59" />
  </Svg>
);
export default SvgLoadingBar1;
