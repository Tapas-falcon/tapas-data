import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const LoafOfBread = (allProps: IconProps) => {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.263 3.664a3.425 3.425 0 015.013 3.562 3.2 3.2 0 01-.908 1.572 1 1 0 00-.204.276L9.004 19.086a1 1 0 00-.166.217 3.424 3.424 0 01-5.044-4.508 3.35 3.35 0 014.676-.92 1 1 0 001.124-1.653 5.35 5.35 0 00-7.472 1.475l-.006.01a5.425 5.425 0 008.368 6.804.998.998 0 00.19-.263l10.16-10.012a1 1 0 00.203-.288 5.2 5.2 0 001.205-2.355A5.425 5.425 0 0011.76 4.926a1 1 0 001.893.645 3.425 3.425 0 011.61-1.907zm-4.602 4.72a3.35 3.35 0 012.578.161 1 1 0 00.885-1.793 5.35 5.35 0 00-7.195 2.49 1 1 0 001.805.863 3.35 3.35 0 011.927-1.721z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default LoafOfBread;
