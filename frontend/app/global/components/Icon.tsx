
import { IconMap } from "./IconMap";

interface IconProps {
  iconName: string;
  style?: string;
  size?: "xs" | "sm" | "md" | "lg";
  // Only set when the icon carries meaning on its own (no visible text next to it)
  label?: string;
}

const sizes = {
  xs: "w-16 h-16",
  sm: "w-20 h-20",
  md: "w-24 h-24",
  lg: "w-[10rem] h-[10rem]",
};

const Icon = ({ iconName, style = "", size = "md", label }: IconProps) => {
  // Look up the corresponding functional component from iconMap
  const SelectedSvg = IconMap[iconName as keyof typeof IconMap] as React.ElementType;
  if (!SelectedSvg) return null;

  return (
    <SelectedSvg
      className={`${sizes[size]} shrink-0 ${style}`}
      // Decorative by default so screen readers don't announce raw SVGs
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    />
  );
};

export default Icon;
