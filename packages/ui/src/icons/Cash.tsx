import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Cash = (allProps: IconProps) => {
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
            d="M4 19c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 17V7c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 5h16c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v10c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 19H4zm0-2h16V7H4v10zm13.5-2.5h-1.75a.728.728 0 00-.75.75.728.728 0 00.75.75H18c.283 0 .52-.096.712-.287A.968.968 0 0019 15v-2.25a.728.728 0 00-.75-.75.728.728 0 00-.75.75v1.75zM12 15c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0015 12c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0012 9c-.833 0-1.542.292-2.125.875A2.893 2.893 0 009 12c0 .833.292 1.542.875 2.125A2.893 2.893 0 0012 15zM6.5 9.5h1.75A.728.728 0 009 8.75.728.728 0 008.25 8H6a.968.968 0 00-.713.287A.968.968 0 005 9v2.25a.728.728 0 00.75.75.728.728 0 00.75-.75V9.5z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Cash;
