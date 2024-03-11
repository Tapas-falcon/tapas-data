import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const StarOutline = (allProps: IconProps) => {
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
            d="M8.85 17.825l3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425-.825 3.575zm3.15.45l-4.15 2.5a.908.908 0 01-.575.15.966.966 0 01-.525-.2 1.2 1.2 0 01-.35-.438.874.874 0 01-.05-.587l1.1-4.725L3.775 11.8a.958.958 0 01-.275-1.075c.067-.183.167-.333.3-.45.133-.117.317-.192.55-.225l4.85-.425 1.875-4.45c.083-.2.213-.35.388-.45.175-.1.354-.15.537-.15.183 0 .363.05.537.15.175.1.305.25.388.45l1.875 4.45 4.85.425c.233.033.417.108.55.225.133.117.233.267.3.45a.958.958 0 01-.275 1.075l-3.675 3.175 1.1 4.725a.874.874 0 01-.05.588c-.083.174-.2.32-.35.437a.966.966 0 01-.525.2.908.908 0 01-.575-.15l-4.15-2.5z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default StarOutline;
