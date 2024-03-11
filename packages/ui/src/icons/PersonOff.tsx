import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const PersonOff = (allProps: IconProps) => {
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
            d="M19.075 21.9L17.15 20H6c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 014 18v-.8c0-.567.146-1.087.437-1.563.292-.475.68-.837 1.163-1.087.75-.383 1.512-.692 2.287-.925a16.395 16.395 0 012.363-.525L2.075 4.925a.93.93 0 01-.288-.712A1.02 1.02 0 012.1 3.5c.2-.2.437-.3.712-.3.275 0 .513.1.713.3l16.975 17c.2.2.3.433.3.7 0 .267-.1.5-.3.7-.2.2-.438.3-.712.3a.973.973 0 01-.713-.3zm-.675-7.35c.483.233.867.587 1.15 1.063.283.474.433.987.45 1.537l-3.35-3.35c.3.117.596.233.888.35.291.117.579.25.862.4zm-4.2-3.2L8.65 5.8a4.085 4.085 0 011.45-1.325A3.92 3.92 0 0112 4c1.1 0 2.042.392 2.825 1.175C15.608 5.958 16 6.9 16 8c0 .683-.158 1.317-.475 1.9a4.085 4.085 0 01-1.325 1.45z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default PersonOff;
