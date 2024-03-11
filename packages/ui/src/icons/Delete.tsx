import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Delete = (allProps: IconProps) => {
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
            d="M7 21c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 015 19V6a.968.968 0 01-.713-.287A.968.968 0 014 5c0-.283.096-.52.287-.713A.968.968 0 015 4h4c0-.283.096-.52.287-.712A.968.968 0 0110 3h4c.283 0 .52.096.713.288.191.191.287.429.287.712h4c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0119 6v13c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0117 21H7zM17 6H7v13h10V6zm-7 11c.283 0 .52-.096.713-.288A.968.968 0 0011 16V9a.967.967 0 00-.287-.713A.968.968 0 0010 8a.968.968 0 00-.713.287A.968.968 0 009 9v7c0 .283.096.52.287.712.192.192.43.288.713.288zm4 0c.283 0 .52-.096.713-.288A.968.968 0 0015 16V9a.967.967 0 00-.287-.713A.968.968 0 0014 8a.968.968 0 00-.713.287A.967.967 0 0013 9v7c0 .283.096.52.287.712.192.192.43.288.713.288z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Delete;
