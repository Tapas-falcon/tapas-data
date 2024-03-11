import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const ShoppingCart = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps;
  return (
    <IconWrapper
      icon={
        <svg
          width="inherit"
          height="inherit"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <g clipPath="url(#prefix__clip0_471_5044)">
            <path
              d="M5.833 15c-.916 0-1.658.75-1.658 1.667 0 .916.742 1.666 1.658 1.666.917 0 1.667-.75 1.667-1.666C7.5 15.75 6.75 15 5.833 15zm-5-12.5c0 .458.375.833.834.833H2.5l3 6.325-1.125 2.034c-.608 1.116.192 2.475 1.458 2.475H15a.836.836 0 00.833-.834A.836.836 0 0015 12.5H5.833l.917-1.667h6.208c.625 0 1.175-.341 1.459-.858L17.4 4.567a.83.83 0 00-.725-1.234H4.342l-.559-1.191a.827.827 0 00-.75-.475H1.667a.836.836 0 00-.834.833zM14.167 15c-.917 0-1.659.75-1.659 1.667 0 .916.742 1.666 1.659 1.666.916 0 1.666-.75 1.666-1.666 0-.917-.75-1.667-1.666-1.667z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_471_5044">
              <path fill="#fff" d="M0 0h20v20H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default ShoppingCart;
