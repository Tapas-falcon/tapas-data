import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Eggs = (allProps: IconProps) => {
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
            clipRule="evenodd"
            d="M8.5 4c2.188 0 4.124 2.567 5.302 5.385.866-1.391 1.981-2.423 3.198-2.423 2.761 0 5 5.315 5 8.076a5 5 0 01-8.48 3.59A6.5 6.5 0 012 14.5c0-.914.189-2.043.529-3.218l.155-.506C3.75 7.474 5.954 4 8.5 4zm0 17a6.5 6.5 0 006.5-6.5c0-.914-.189-2.043-.529-3.218l-.155-.506C13.25 7.474 11.046 4 8.5 4s-4.75 3.474-5.816 6.776l-.155.506C2.189 12.457 2 13.586 2 14.5A6.5 6.5 0 008.5 21z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Eggs;
