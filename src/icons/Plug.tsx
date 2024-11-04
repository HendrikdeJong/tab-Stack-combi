import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgPlug = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path d="M0 5.647h9.412v3.765H0zM0 16.941h9.412v3.765H0zM9.412 0h7.529c7.277 0 13.176 5.899 13.176 13.176s-5.899 13.176-13.176 13.176H9.412V-.001z" />
    <Path d="m28.227 15.059.017-3.765 1.053.01.928.022.834.036.771.051c1.842.147 3.333.46 4.622 1.045a7.76 7.76 0 0 1 3.829 3.611c.701 1.377 1.056 3.001 1.12 4.925l.011.653c0 2.027.542 3.365 1.439 4.207.56.53 1.275.861 2.036.948l.328.022-.077 3.764a7.3 7.3 0 0 1-4.869-1.994c-1.569-1.472-2.5-3.62-2.611-6.385l-.011-.561c0-1.664-.243-2.93-.724-3.874a4.02 4.02 0 0 0-2.001-1.874c-.855-.388-1.947-.618-3.393-.733l-.692-.046-.762-.032-1.338-.026-.512-.004z" />
  </Svg>
);
export default SvgPlug;