import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const ExpandCircleLeft = (allProps: IconProps) => {
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
            d="M11.325 12L13.7 9.625a.933.933 0 00.275-.688c0-.274-.092-.512-.275-.712-.2-.2-.438-.3-.712-.3-.275 0-.513.1-.713.3L9.2 11.3c-.2.2-.3.433-.3.7 0 .267.1.5.3.7l3.1 3.1c.2.2.433.296.7.287.267-.008.5-.112.7-.312.183-.2.28-.433.288-.7a.916.916 0 00-.288-.7L11.325 12zM22 12a9.738 9.738 0 01-.788 3.9 10.098 10.098 0 01-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0112 22a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 012 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 012.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0112 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 013.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0122 12z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default ExpandCircleLeft;
