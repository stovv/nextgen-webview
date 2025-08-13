import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const IconBack = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#040415"
      fillOpacity={0.47}
      d="M11 7.5 7.5 11H19v2H7.5l3.5 3.5L9.5 18 4 12l5.5-6L11 7.5Z"
    />
  </Svg>
)
export default IconBack;
