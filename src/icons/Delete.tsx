import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDelete = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M29.333 4h-20c-.92 0-1.64.467-2.12 1.173L0 16l7.213 10.813c.48.707 1.2 1.187 2.12 1.187h20C30.8 28 32 26.8 32 25.333V6.666c0-1.467-1.2-2.667-2.667-2.667zm-4 16.787-1.88 1.88-4.787-4.787-4.787 4.787-1.88-1.88L16.786 16l-4.787-4.787 1.88-1.88 4.787 4.787 4.787-4.787 1.88 1.88L20.546 16z" />
  </Svg>
);
export default SvgDelete;
