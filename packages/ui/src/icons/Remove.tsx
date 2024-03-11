import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Remove = (allProps: IconProps) => {
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
            d="M6 13a.967.967 0 01-.713-.287A.968.968 0 015 12c0-.283.096-.52.287-.713A.967.967 0 016 11h12c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0118 13H6z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Remove;
