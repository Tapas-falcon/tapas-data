import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const DrawerClose = (allProps: IconProps) => {
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
            d="M9.2 11.5h5.6c.233 0 .392-.1.475-.3.083-.2.042-.383-.125-.55L12.7 8.2a.96.96 0 00-.7-.3c-.267 0-.5.1-.7.3l-2.45 2.45c-.167.167-.208.35-.125.55.083.2.242.3.475.3zM5 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 013 19V5c0-.55.196-1.02.587-1.413A1.926 1.926 0 015 3h14c.55 0 1.02.196 1.413.587C20.803 3.98 21 4.45 21 5v14c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0119 21H5zm0-5v3h14v-3H5zm0-2h14V5H5v9z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default DrawerClose;
