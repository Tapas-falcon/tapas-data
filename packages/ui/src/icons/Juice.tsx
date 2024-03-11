import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Juice = (allProps: IconProps) => {
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
            d="M3.75.5a1 1 0 000 2h3.194l.588 3.775H3.75a1 1 0 00-.999 1.048l.75 15.525a1 1 0 00.999.952H15a1 1 0 00.999-.952l.509-10.532a5.125 5.125 0 004.817-5.023v-.018A5.125 5.125 0 0016.2 2.15h-.018a5.125 5.125 0 00-4.934 4.125H9.556l-.768-4.929A1 1 0 007.8.5H3.75zm8.4 7.775H9.868L10.76 14h3.664l.277-5.725h-2.55zm1.164-2A3.124 3.124 0 0116.21 4.15a3.125 3.125 0 013.116 3.116 3.125 3.125 0 01-2.72 3.033l.144-2.976a1 1 0 00-.999-1.048h-2.436zm-5.47 2L8.736 14h-3.66L4.8 8.275h3.045zm1.668 10.704L9.048 16H5.173l.28 5.8h8.594l.28-5.8h-3.255l.416 2.671a1 1 0 01-1.976.308z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Juice;
