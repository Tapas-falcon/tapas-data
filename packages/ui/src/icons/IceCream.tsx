import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const IceCream = (allProps: IconProps) => {
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
            d="M15.967.644a1 1 0 01.339 1.373L14.96 4.244a4.75 4.75 0 012.032 1.089l2.655-2.006a1 1 0 111.206 1.596l-2.696 2.036c.257.591.393 1.234.393 1.891a1 1 0 11-2 0 2.75 2.75 0 10-5.5 0 1 1 0 11-2 0 4.75 4.75 0 013.571-4.601L14.594.983a1 1 0 011.373-.339zM4.041 10.436a.99.99 0 01.482-.111h13.004a.995.995 0 01.815.39 1 1 0 01.168.89 7.75 7.75 0 01-6.485 5.677V20.9h3.35a1 1 0 110 2h-8.7a1 1 0 110-2h3.35v-3.618a7.75 7.75 0 01-6.485-5.677.995.995 0 01.169-.892c.088-.113.2-.209.332-.277zm1.922 1.889a5.75 5.75 0 0010.123 0H5.964zm.867-5.42A2.75 2.75 0 018.775 6.1a1 1 0 100-2 4.75 4.75 0 00-4.75 4.75 1 1 0 002 0c0-.73.29-1.429.805-1.945z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default IceCream;
