import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgWarningTriangle = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M16 21.484v-2.969a.51.51 0 0 0-.5-.516h-3c-.281 0-.5.234-.5.516v2.969c0 .281.219.516.5.516h3c.281 0 .5-.234.5-.516m-.031-5.843.281-7.172a.38.38 0 0 0-.156-.297C16 8.094 15.86 8 15.719 8h-3.437c-.141 0-.281.094-.375.172-.109.078-.156.234-.156.328l.266 7.141c0 .203.234.359.531.359h2.891c.281 0 .516-.156.531-.359zM15.75 1.047l12 22c.344.609.328 1.359-.031 1.969S26.703 26 26 26H2c-.703 0-1.359-.375-1.719-.984s-.375-1.359-.031-1.969l12-22a1.988 1.988 0 0 1 3.5 0" />
  </Svg>
);
export default SvgWarningTriangle;
