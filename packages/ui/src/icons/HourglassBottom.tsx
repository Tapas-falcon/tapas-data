import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const HourglassBottom = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps;
  return (
    <IconWrapper
      icon={
        <svg
          width="inherit"
          height="inherit"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M12 11c1.1 0 2.042-.392 2.825-1.175C15.608 9.042 16 8.1 16 7V4H8v3c0 1.1.392 2.042 1.175 2.825C9.958 10.608 10.9 11 12 11zM5 22a.967.967 0 01-.713-.288A.968.968 0 014 21c0-.283.096-.52.287-.712A.967.967 0 015 20h1v-3c0-1.017.237-1.97.713-2.863A5.572 5.572 0 018.7 12a5.572 5.572 0 01-1.987-2.137A5.998 5.998 0 016 7V4H5a.968.968 0 01-.713-.288A.968.968 0 014 3c0-.283.096-.52.287-.712A.968.968 0 015 2h14c.283 0 .52.096.712.288.192.191.288.429.288.712s-.096.52-.288.712A.968.968 0 0119 4h-1v3c0 1.017-.238 1.97-.712 2.863A5.572 5.572 0 0115.3 12a5.572 5.572 0 011.988 2.137c.474.892.712 1.846.712 2.863v3h1c.283 0 .52.096.712.288.192.191.288.429.288.712s-.096.52-.288.712A.968.968 0 0119 22H5z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default HourglassBottom;
