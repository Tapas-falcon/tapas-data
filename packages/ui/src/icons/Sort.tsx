import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Sort = (allProps: IconProps) => {
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
            d="M8.33 6.654l2.886-3.283c.434-.495 1.136-.495 1.57 0l2.886 3.283c.702.799.201 2.168-.79 2.168H9.11c-.991 0-1.482-1.37-.78-2.168zM15.67 17.346l-2.886 3.283c-.434.495-1.136.495-1.57 0l-2.886-3.283c-.702-.799-.201-2.168.79-2.168h5.772c.991 0 1.482 1.37.78 2.168z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Sort;
