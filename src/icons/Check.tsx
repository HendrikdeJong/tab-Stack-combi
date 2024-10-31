import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCheck = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M12 21.56 6.44 16l-1.893 1.88L12 25.333l16-16-1.88-1.88z" />
  </Svg>
);
export default SvgCheck;
