import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const LocalPizza = (allProps: IconProps) => {
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
          <g clipPath="url(#prefix__clip0_270_2180)">
            <path
              d="M12 2C9.01 2 6.28 3.08 4.17 4.88c-.71.61-.86 1.65-.4 2.46l7.36 13.11c.38.68 1.36.68 1.74 0l7.36-13.11c.46-.81.31-1.86-.4-2.46C17.73 3.09 14.99 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_270_2180">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default LocalPizza;
