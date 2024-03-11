import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Gluten = (allProps: IconProps) => {
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
            d="M4.907 11.465a4.767 4.767 0 01.212 7.46l-.212.168a4.767 4.767 0 01-.212-7.46l.212-.168zm3.814-3.813a4.767 4.767 0 01.212 7.458l-.212.17a4.767 4.767 0 01-.212-7.46l.212-.168zm3.813-3.814a4.767 4.767 0 01.212 7.459l-.212.168a4.767 4.767 0 01-.212-7.459l.212-.168zm7.628 7.627a4.767 4.767 0 01-7.459.212l-.169-.212a4.767 4.767 0 017.46-.212l.168.212zm-3.814 3.814a4.767 4.767 0 01-7.459.212l-.168-.212a4.767 4.767 0 017.459-.212l.168.212zm-3.814 3.814a4.767 4.767 0 01-7.458.212l-.169-.212a4.767 4.767 0 017.459-.212l.168.212zm8.417-16.045a4.767 4.767 0 01-5.124 5.424l-.269-.03a4.767 4.767 0 015.393-5.394z"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Gluten;
