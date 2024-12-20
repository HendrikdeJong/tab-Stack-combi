import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgGrid = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M30.41 14.38C30.41 6.44 23.97 0 16.03 0S1.65 6.44 1.65 14.38c0 6.83 4.76 12.55 11.15 14.01 0 .13-.01.24-.01.37 0 1.8 1.46 3.24 3.24 3.24s3.24-1.44 3.24-3.24c0-.13-.01-.24-.01-.37 6.38-1.46 11.15-7.18 11.15-14.01M7.46 10.73c0-1.8 1.46-3.24 3.24-3.24s3.24 1.44 3.24 3.24-1.44 3.24-3.24 3.24-3.24-1.46-3.24-3.24m8.57 12.28c-1.79 0-3.24-1.46-3.24-3.26s1.46-3.24 3.24-3.24 3.24 1.46 3.24 3.24-1.44 3.26-3.24 3.26m5.36-9.04c-1.79 0-3.24-1.46-3.24-3.24s1.46-3.24 3.24-3.24a3.24 3.24 0 1 1 0 6.48" />
  </Svg>
);
export default SvgGrid;
