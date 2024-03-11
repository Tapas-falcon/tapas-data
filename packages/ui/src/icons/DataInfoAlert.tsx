import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const DataInfoAlert = (allProps: IconProps) => {
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
            d="M4 20a.967.967 0 01-.712-.288A.968.968 0 013 19c0-.283.096-.52.288-.712A.967.967 0 014 18h10c.283 0 .52.096.713.288.191.191.287.429.287.712s-.096.52-.287.712A.968.968 0 0114 20H4zm12-7c-1.383 0-2.563-.488-3.537-1.463C11.488 10.563 11 9.383 11 8s.488-2.563 1.463-3.537C13.438 3.487 14.617 3 16 3s2.563.487 3.538 1.463C20.512 5.437 21 6.617 21 8s-.488 2.563-1.462 3.537C18.562 12.512 17.383 13 16 13zM4 12a.967.967 0 01-.712-.287A.968.968 0 013 11c0-.283.096-.52.288-.713A.967.967 0 014 10h5.3c.117.367.25.717.4 1.05.15.333.333.65.55.95H4zm0 4a.967.967 0 01-.712-.287A.968.968 0 013 15c0-.283.096-.52.288-.713A.967.967 0 014 14h8.4c.383.233.792.43 1.225.588.433.158.892.27 1.375.337V15c0 .283-.096.52-.287.713A.968.968 0 0114 16H4zm12-5a.48.48 0 00.35-.15c.1-.1.15-.217.15-.35v-3a.48.48 0 00-.15-.35.48.48 0 00-.7 0 .48.48 0 00-.15.35v3c0 .133.05.25.15.35.1.1.217.15.35.15zm0-5a.48.48 0 00.35-.15.48.48 0 000-.7.48.48 0 00-.7 0 .48.48 0 000 .7c.1.1.217.15.35.15z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default DataInfoAlert;