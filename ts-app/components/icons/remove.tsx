import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RemoveIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#090C25"
      fillOpacity={0.28}
      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 8.586L9.5 8 8 9.5l2.586 2.5L8 14.5 9.5 16l2.5-2.586L14.5 16l1.5-1.5-2.586-2.5L16 9.5 14.5 8 12 10.586Z"
    />
  </Svg>
)
export default RemoveIcon;
