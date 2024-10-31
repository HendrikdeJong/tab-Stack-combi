import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSolarPanel = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M12.057 14.4H6.164l1.322-5.6h5.143zM19.024 14.4h-5.893l.375-5.6h5.143zM25.936 14.4h-5.893l-.518-5.6h5.143zM11.348 23.2h-7.27l1.818-8h6.182zM19.745 23.2h-7.333l.549-8h6.234zM28.078 23.2h-7.27l-.73-8h6.18z" />
    <Path d="M6.406 7.2 2.295 24.8h27.568l-4.11-17.6H6.407zm-1.479-.703a1.16 1.16 0 0 1 1.13-.897H26.1a1.16 1.16 0 0 1 1.13.897l4.315 18.478a1.16 1.16 0 0 1-1.13 1.425H1.74a1.16 1.16 0 0 1-1.13-1.425L4.926 6.497z" />
  </Svg>
);
export default SvgSolarPanel;
