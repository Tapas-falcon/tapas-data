import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Lactose = (allProps: IconProps) => {
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
            d="M9 3h5m-6.692 7.512l.928-1.475a10.545 10.545 0 001.535-4.265L10 3h3l.207 1.66C13.4 6.2 13.928 7.683 14.75 9l.946 1.514a2 2 0 01.304 1.06V19a2 2 0 01-2 2H9a2 2 0 01-2-2v-7.423a2 2 0 01.308-1.065zM7 14l.628.21c1.486.495 3.12.23 4.372-.71l.211-.158a3.619 3.619 0 013.583-.437L16 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-5z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Lactose;
