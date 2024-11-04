import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgBell = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M14.25 26.5a.246.246 0 0 0-.25-.25A2.26 2.26 0 0 1 11.75 24c0-.141-.109-.25-.25-.25s-.25.109-.25.25A2.754 2.754 0 0 0 14 26.75c.141 0 .25-.109.25-.25M3.844 22h20.312C21.359 18.844 20 14.562 20 9c0-2.016-1.906-5-6-5S8 6.984 8 9c0 5.563-1.359 9.844-4.156 13M27 22c0 1.094-.906 2-2 2h-7c0 2.203-1.797 4-4 4s-4-1.797-4-4H3c-1.094 0-2-.906-2-2 2.312-1.953 5-5.453 5-13 0-3 2.484-6.281 6.625-6.891A1.6 1.6 0 0 1 12.5 1.5a1.5 1.5 0 0 1 3 0c0 .219-.047.422-.125.609C19.516 2.718 22 6 22 9c0 7.547 2.688 11.047 5 13" />
  </Svg>
);
export default SvgBell;