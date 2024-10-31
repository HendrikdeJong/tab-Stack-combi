import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSinus = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M0 18.05s.76-6.46 4.04-12.41c3.28-5.96 8.4-2.5 8.4-2.5s3.53 2.72 4.74 9.59c1.21 6.86 3.3 11.05 3.3 11.05s1.92 4.04 3.88.76 3.41-10.55 3.41-10.55h4.14S30.42 22.45 28 26.13s-4.39 3.61-4.39 3.61-3.2.96-5.6-2.32S14 16.6 14 16.6s-1.06-5.68-2.62-8.45-2.83-1.82-2.83-1.82-1.69.81-2.83 4.84-1.54 6.86-1.54 6.86l-4.19.03z" />
  </Svg>
);
export default SvgSinus;
