import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Fish = (allProps: IconProps) => {
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
            d="M13.037 17.19a9.927 9.927 0 01-3.998-.653m5.078-8.543a9.858 9.858 0 00-5.896.904m-.86.48C12 6.484 18.105 7.899 21 12.538l-.229.35a9.9 9.9 0 01-1.977 2.134c-3.892 3.121-9.42 2.825-12.957-.49a3.67 3.67 0 01-3.685 2.328L2 16.846v-.258a5.22 5.22 0 011.772-3.92c-1.019-.791-1.69-2-1.765-3.361L2 9.05v-.82l.207.01a4.181 4.181 0 013.52 2.412A9.877 9.877 0 017.36 9.378z"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            clipRule="evenodd"
            d="M16.5 11.6v-.1.1z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Fish;
