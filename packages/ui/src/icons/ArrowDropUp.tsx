import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const ArrowDropUp = (allProps: IconProps) => {
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
          <g clipPath="url(#prefix__clip0_283_1447)">
            <path
              d="M8.71 12.29L11.3 9.7a.996.996 0 011.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_283_1447">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default ArrowDropUp;
