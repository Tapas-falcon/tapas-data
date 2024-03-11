import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Snacks = (allProps: IconProps) => {
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
            d="M10.05 6.218a7.55 7.55 0 100 15.1 7.55 7.55 0 000-15.1zM.5 13.768a9.55 9.55 0 1119.1 0 9.55 9.55 0 01-19.1 0z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.837 2.5a4.78 4.78 0 00-3.38 1.4 1 1 0 11-1.414-1.414 6.78 6.78 0 019.59 9.59 1 1 0 01-1.415-1.415 4.78 4.78 0 00-3.38-8.161z"
            fill="currentColor"
          />
          <path
            d="M17.4 6.268a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1zM10.05 15.343a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1zM11.1 10.393a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1zM14.775 16.393a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1zM7.65 19.393a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1zM6 12.943a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Snacks;
