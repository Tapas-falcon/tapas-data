import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Back = (allProps: IconProps) => {
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
            d="M7.825 13l4.9 4.9c.2.2.296.433.287.7-.008.267-.112.5-.312.7-.2.183-.433.28-.7.287a.916.916 0 01-.7-.287l-6.6-6.6a.877.877 0 01-.213-.325A1.107 1.107 0 014.425 12c0-.133.02-.258.063-.375A.877.877 0 014.7 11.3l6.6-6.6a.933.933 0 01.688-.275c.274 0 .512.092.712.275.2.2.3.438.3.712 0 .276-.1.513-.3.713L7.825 11H19c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0119 13H7.825z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Back;
