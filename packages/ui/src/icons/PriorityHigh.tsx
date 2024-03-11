import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const PriorityHigh = (allProps: IconProps) => {
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
            d="M12 21c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 0110 19c0-.55.196-1.02.588-1.413A1.926 1.926 0 0112 17c.55 0 1.02.196 1.412.587.392.392.588.863.588 1.413s-.196 1.02-.588 1.413A1.926 1.926 0 0112 21zm0-6c-.55 0-1.02-.196-1.412-.588A1.926 1.926 0 0110 13V5c0-.55.196-1.02.588-1.413A1.926 1.926 0 0112 3c.55 0 1.02.196 1.412.587C13.804 3.98 14 4.45 14 5v8c0 .55-.196 1.02-.588 1.412A1.926 1.926 0 0112 15z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default PriorityHigh;
