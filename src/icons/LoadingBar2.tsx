import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLoadingBar2 = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M21.62 3.25h-.61V1.71C21.01.77 20.25 0 19.3 0h-6.65c-.93 0-1.7.76-1.7 1.71v1.54h-.61c-1.89 0-3.41 1.53-3.41 3.41v21.92c0 1.89 1.53 3.41 3.41 3.41h11.27c1.89 0 3.41-1.53 3.41-3.41V6.66c0-1.89-1.53-3.41-3.41-3.41zm-.31 26.61H10.66c-.87 0-1.59-.72-1.59-1.59s.72-1.6 1.59-1.6h10.65a1.594 1.594 0 0 1 0 3.19m0-5.33H10.66c-.87 0-1.59-.72-1.59-1.59s.72-1.59 1.59-1.59h10.65c.87 0 1.59.7 1.59 1.59s-.72 1.59-1.59 1.59" />
  </Svg>
);
export default SvgLoadingBar2;
