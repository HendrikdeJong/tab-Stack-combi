import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLock = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M24 10.667h-1.333V8c0-3.68-2.987-6.667-6.667-6.667S9.333 4.32 9.333 8v2.667H8a2.675 2.675 0 0 0-2.667 2.667v13.333c0 1.467 1.2 2.667 2.667 2.667h16c1.467 0 2.667-1.2 2.667-2.667V13.334c0-1.467-1.2-2.667-2.667-2.667m-3.867 0h-8.267V8c0-2.28 1.853-4.133 4.133-4.133S20.132 5.72 20.132 8v2.667z" />
  </Svg>
);
export default SvgLock;
