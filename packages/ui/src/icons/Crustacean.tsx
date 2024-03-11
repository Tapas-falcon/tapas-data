import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Crustacean = (allProps: IconProps) => {
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
            d="M5 8l2.054.342A3.388 3.388 0 0011 5L9 6V3l-.2.005A4 4 0 005 7v1zm0 0v.64a4 4 0 00.83 2.438L7 12.6m-.5.4H5.236a2 2 0 00-1.789 1.106L3 15m2.8 1h-.564a2 2 0 00-1.789 1.106L3 18m5.5 1H7.236a2 2 0 00-1.789 1.106L5 21m12.5-8h1.264a2 2 0 011.789 1.106L21 15m-2.8 1h.564a2 2 0 011.789 1.106L21 18m-5.5 1h1.264a2 2 0 011.789 1.106L19 21m0-13v.64a4 4 0 01-.83 2.438L17 12.6M19 8l-2.054.342A3.389 3.389 0 0113 5l2 1V3l.2.005A4 4 0 0119 7v1zM8.29 18.823l.835.49a5.68 5.68 0 005.75 0l.835-.49a5.391 5.391 0 002.54-3.51 2.215 2.215 0 00-1.697-2.634l-.071-.014-1.107-.165a23.032 23.032 0 00-6.75 0l-1.035.153a2.215 2.215 0 00-1.84 2.66 5.391 5.391 0 002.54 3.51z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            clipRule="evenodd"
            d="M10.5 10.6v-.1.1zM13.5 10.6v-.1.1z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Crustacean;
