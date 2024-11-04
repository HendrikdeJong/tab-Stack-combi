import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgCharger = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="m31.515.158.325.325a.87.87 0 0 1 0 1.23L1.816 31.737a.87.87 0 0 1-1.23 0l-.325-.325a.87.87 0 0 1 0-1.23L30.285.158a.87.87 0 0 1 1.23 0M29.13 24.72v.46c0 .48-.39.87-.87.87H15.35a.87.87 0 0 1-.87-.87v-.46c0-.48.389-.87.87-.87h12.91c.48 0 .87.39.87.87M18.42 28.05v.46c0 .48-.39.87-.87.87h-2.21a.87.87 0 0 1-.87-.87v-.46c0-.48.389-.87.87-.87h2.21c.48 0 .87.39.87.87M23.78 28.06v.46c0 .48-.39.87-.87.87H20.7a.87.87 0 0 1-.87-.87v-.46c0-.48.39-.87.87-.87h2.21c.48 0 .87.39.87.87M29.13 28.06v.46c0 .48-.39.87-.87.87h-2.21a.87.87 0 0 1-.87-.87v-.46c0-.48.39-.87.87-.87h2.21c.48 0 .87.39.87.87" />
    <Path d="M23.82 28.06v.46c0 .48-.39.87-.87.87h-2.21a.87.87 0 0 1-.87-.87v-.46c0-.48.39-.87.87-.87h2.21c.48 0 .87.39.87.87M1.901 10.329.02 9.716s.727-2.453 2.733-3.492 3.772.229 3.772.229l1.943 1.278s2.047 1.434 2.723.769 1.372-1.881 1.372-1.881l1.756.977s-.623 1.559-2.11 2.608-3.357 0-3.357 0-1.699-.922-2.207-1.29-1.189-.767-1.189-.767-.775-.516-1.557-.274c-.782.243-1.998 2.455-1.998 2.455z" />
  </Svg>
);
export default SvgCharger;