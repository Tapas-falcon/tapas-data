import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Backspace = (allProps: IconProps) => {
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
            d="M9 19a2.02 2.02 0 01-.937-.225 1.911 1.911 0 01-.713-.625l-3.525-5A1.936 1.936 0 013.45 12c0-.417.125-.8.375-1.15l3.525-5c.183-.267.42-.475.713-.625A2.02 2.02 0 019 5h10c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v10c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0119 19H9zm5-5.6l1.9 1.9a.948.948 0 00.7.275.948.948 0 00.7-.275.948.948 0 00.275-.7.948.948 0 00-.275-.7L15.4 12l1.9-1.9a.948.948 0 00.275-.7.948.948 0 00-.275-.7.948.948 0 00-.7-.275.948.948 0 00-.7.275L14 10.6l-1.9-1.9a.948.948 0 00-.7-.275.948.948 0 00-.7.275.948.948 0 00-.275.7c0 .283.092.517.275.7l1.9 1.9-1.9 1.9a.948.948 0 00-.275.7c0 .283.092.517.275.7a.948.948 0 00.7.275.948.948 0 00.7-.275l1.9-1.9z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Backspace;
