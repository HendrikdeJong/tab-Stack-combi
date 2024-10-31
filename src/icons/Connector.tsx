import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgConnector = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M32 18.65v6.69c0 .99-.8 1.79-1.79 1.79s-1.78-.8-1.78-1.79v-5.46c0-1.15-.92-2.07-2.08-2.08h-3.9c-.86 5.41-5.54 9.55-11.21 9.55-.26 0-.52-.01-.77-.03-.12.01-.24.03-.37.03H8.99c-.48 0-.92-.12-1.3-.34-.23-.12-.45-.29-.63-.46-.49-.49-.79-1.16-.79-1.92v-1.15H1.78C.8 23.48 0 22.68 0 21.7c0-.58.29-1.1.72-1.43.29-.22.67-.35 1.06-.35h4.48v-8.07H1.78a1.78 1.78 0 0 1 0-3.56h4.48v-.91c0-.76.3-1.43.79-1.92.18-.18.39-.34.63-.46.38-.22.83-.34 1.3-.34h1.11c.12 0 .24.01.37.03.26-.01.52-.03.77-.03 5.67 0 10.35 4.14 11.21 9.55h5.05c2.47 0 4.47 1.98 4.5 4.44z" />
  </Svg>
);
export default SvgConnector;
