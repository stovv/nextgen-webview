import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import {FC} from "react";

const Airplane: FC<SvgProps> = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#040415"
      fillOpacity={0.47}
      d="M19.983 3.219c.48-.11.91.32.8.8a7.335 7.335 0 0 1-1.96 3.537l-2.078 2.077 1.692 9.308c.212 1.163-.858 1.51-1.736 1.796l-.193.064-4.04-6.89-2.615 2.612.143 2.14c.057.854-.43 1.65-1.217 1.987l-.351.15L6.5 17.5l-3.3-1.927.15-.35a2.016 2.016 0 0 1 1.987-1.218l2.14.143 2.614-2.615L3.2 7.494l.064-.194c.285-.879.633-1.948 1.796-1.737l9.31 1.693 2.076-2.077a7.336 7.336 0 0 1 3.537-1.96Z"
    />
  </Svg>
)
export default Airplane;
