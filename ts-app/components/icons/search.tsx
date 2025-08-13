import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#040415"
      fillOpacity={0.47}
      d="M10.544 3a7.545 7.545 0 0 1 6.126 11.95L22 20.28 20.28 22l-5.33-5.33A7.545 7.545 0 1 1 10.544 3Zm0 2.434a5.11 5.11 0 1 0 0 10.221 5.11 5.11 0 0 0 0-10.221Z"
    />
  </Svg>
)
export default SearchIcon;
