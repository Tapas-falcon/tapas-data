import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const SO2 = (allProps: IconProps) => {
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
            d="M9.435 3h5.106m-4.084 7.073V3h3.063v7l5.15 7.926a1.976 1.976 0 01-.626 2.761 2.074 2.074 0 01-1.096.313H7.042C5.914 21 5 20.105 5 19c0-.382.112-.757.323-1.079l5.134-7.848zM7.24 15h9.548l1.895 2.93c.603.933.32 2.169-.633 2.76-.327.202-.706.31-1.093.31H7.046c-1.128 0-2.043-.895-2.043-2 0-.383.113-.758.324-1.08L7.24 15z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default SO2;
