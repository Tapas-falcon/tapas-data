import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Apple = (allProps: IconProps) => {
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
            d="M15.066 5.14c-.672.892-1.83 1.576-2.908 1.449-.232-1.17.405-2.33 1.008-3.083C13.92 2.614 15.136 2 16.18 2a4.285 4.285 0 01-1.113 3.14zm1.02 1.704c.695 0 2.561.197 3.708 1.981-.081.058-2.201 1.228-2.201 3.836.092 2.978 2.665 4.02 2.711 4.02-.046.047-.382 1.414-1.402 2.85-.811 1.23-1.715 2.469-3.07 2.469-1.299 0-1.774-.823-3.269-.823-1.599 0-2.062.823-3.29.823-1.368 0-2.33-1.31-3.187-2.526-1.112-1.61-2.062-4.125-2.086-6.535-.011-1.275.232-2.515.835-3.57.892-1.483 2.456-2.49 4.16-2.525 1.309-.047 2.468.892 3.279.892.753 0 2.19-.892 3.812-.892z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Apple;
