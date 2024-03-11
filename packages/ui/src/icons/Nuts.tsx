import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Nuts = (allProps: IconProps) => {
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
            d="M12.23 20c4-1.333 6-3.559 6-6.677V11h-12v2.323c0 3.118 2 5.344 6 6.677zM7.73 6l2.775-.793a1 1 0 00.725-.961V3h2l-.442.885a1 1 0 00.652 1.417L16.23 6a4.123 4.123 0 013.045 4.8l-.045.2h-14l-.117-.469A3.763 3.763 0 017.73 6z"
            stroke="currentColor"
            strokeLinecap="square"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Nuts;
