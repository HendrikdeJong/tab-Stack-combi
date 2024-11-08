import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSettings = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M25.52 17.248c.048-.4.08-.816.08-1.248s-.032-.848-.096-1.248l2.704-2.112a.66.66 0 0 0 .16-.816l-2.56-4.432a.65.65 0 0 0-.784-.288l-3.184 1.28a9.4 9.4 0 0 0-2.16-1.248l-.48-3.392a.64.64 0 0 0-.64-.544h-5.12a.623.623 0 0 0-.624.544l-.48 3.392a9.6 9.6 0 0 0-2.16 1.248l-3.184-1.28a.63.63 0 0 0-.784.288l-2.56 4.432a.62.62 0 0 0 .16.816l2.704 2.112c-.064.4-.112.832-.112 1.248s.032.848.096 1.248L3.792 19.36a.66.66 0 0 0-.16.816l2.56 4.432a.65.65 0 0 0 .784.288l3.184-1.28a9.4 9.4 0 0 0 2.16 1.248l.48 3.392a.65.65 0 0 0 .64.544h5.12c.32 0 .592-.224.624-.544l.48-3.392a9.6 9.6 0 0 0 2.16-1.248l3.184 1.28c.288.112.624 0 .784-.288l2.56-4.432a.62.62 0 0 0-.16-.816zM16 20.8c-2.64 0-4.8-2.16-4.8-4.8s2.16-4.8 4.8-4.8 4.8 2.16 4.8 4.8-2.16 4.8-4.8 4.8" />
  </Svg>
);
export default SvgSettings;
