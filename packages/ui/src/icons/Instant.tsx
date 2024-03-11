import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Instant = (allProps: IconProps) => {
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
          <g clipPath="url(#prefix__clip0_291_1967)">
            <path
              d="M7 3v9c0 .55.45 1 1 1h2v7.15c0 .51.67.69.93.25l5.19-8.9a.995.995 0 00-.86-1.5H13l2.49-6.65A.994.994 0 0014.56 2H8c-.55 0-1 .45-1 1z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_291_1967">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default Instant;
