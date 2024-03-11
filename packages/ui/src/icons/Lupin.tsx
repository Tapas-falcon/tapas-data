import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Lupin = (allProps: IconProps) => {
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
            d="M14.334 10.58c0-1.07.858-1.937 1.917-1.937h3.833c1.058 0 1.916.867 1.916 1.936v3.873c0 1.07-.858 1.937-1.916 1.937H16.25a1.927 1.927 0 01-1.917-1.937V10.58zM3.561 7.044a1.95 1.95 0 010-2.738l2.71-2.739a1.902 1.902 0 012.71 0l2.711 2.739a1.95 1.95 0 010 2.738l-2.71 2.739a1.903 1.903 0 01-2.71 0l-2.71-2.739zM6.272 14.217a1.903 1.903 0 012.71 0l2.71 2.739a1.95 1.95 0 010 2.738l-2.71 2.739a1.902 1.902 0 01-2.71 0l-2.71-2.739a1.95 1.95 0 010-2.738l2.71-2.739z"
            stroke="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Lupin;
