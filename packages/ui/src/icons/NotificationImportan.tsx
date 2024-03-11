import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const NotificationImportan = (allProps: IconProps) => {
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
            d="M5 19a.967.967 0 01-.713-.288A.968.968 0 014 18c0-.283.096-.52.287-.712A.967.967 0 015 17h1v-7c0-1.383.417-2.612 1.25-3.688.833-1.075 1.917-1.779 3.25-2.112v-.7c0-.417.146-.77.438-1.063A1.447 1.447 0 0112 2c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062v.7c1.333.333 2.417 1.037 3.25 2.112C17.583 7.388 18 8.617 18 10v7h1c.283 0 .52.096.712.288.192.191.288.429.288.712s-.096.52-.288.712A.968.968 0 0119 19H5zm7 3c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0110 20h4c0 .55-.196 1.02-.588 1.413A1.926 1.926 0 0112 22zm0-9c.283 0 .52-.096.713-.287A.968.968 0 0013 12V9a.967.967 0 00-.287-.713A.968.968 0 0012 8a.968.968 0 00-.713.287A.967.967 0 0011 9v3c0 .283.096.52.287.713.192.191.43.287.713.287zm0 3c.283 0 .52-.096.713-.287A.968.968 0 0013 15a.968.968 0 00-.287-.713A.968.968 0 0012 14a.968.968 0 00-.713.287A.968.968 0 0011 15c0 .283.096.52.287.713.192.191.43.287.713.287z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default NotificationImportan;