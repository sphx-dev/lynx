import React, { FC } from "react"
import IconWrapper, { IIconWrapperProps, TSize } from "./IconWrapper"
import { icons } from "../../assets/icons"
import useTheme from "../../hooks/useTheme";

interface IIconProps extends Omit<IIconWrapperProps, "size"> {
  icon: keyof typeof icons
  onClick?: () => void
  size?: TSize
}

const Icon: FC<IIconProps> = ({
  icon,
  size = "extraSmall",
  fill = "none",
  stroke,
  strokeWidth,
  hoverColor,
  onClick,
  ...props
}) => {
  const { themeColors } = useTheme()
  if (!icon) {
    return null
  }

  const IconComponent = () => icons[icon]
  return (
    <IconWrapper
      onClick={onClick}
      size={size}
      fill={fill}
      stroke={stroke || themeColors.text.primary}
      strokeWidth={strokeWidth}
      hoverColor={hoverColor}
      {...props}
    >
      <IconComponent />
    </IconWrapper>
  )
}

export default Icon
