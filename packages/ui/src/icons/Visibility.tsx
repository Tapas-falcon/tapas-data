import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Visibility = (allProps: IconProps) => {
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
            d="M12 16c1.25 0 2.313-.438 3.188-1.313.874-.874 1.312-1.937 1.312-3.187 0-1.25-.438-2.313-1.313-3.188C14.313 7.439 13.25 7 12 7c-1.25 0-2.313.438-3.188 1.313C7.937 9.187 7.5 10.25 7.5 11.5c0 1.25.437 2.313 1.312 3.188C9.687 15.562 10.75 16 12 16zm0-1.8c-.75 0-1.387-.262-1.912-.787A2.604 2.604 0 019.3 11.5c0-.75.262-1.387.787-1.912A2.604 2.604 0 0112 8.8c.75 0 1.387.262 1.912.787.525.526.788 1.163.788 1.913s-.262 1.387-.787 1.912A2.604 2.604 0 0112 14.2zm0 4.8c-2.233 0-4.27-.6-6.113-1.8-1.841-1.2-3.295-2.783-4.362-4.75a1.907 1.907 0 01-.187-1.438c.041-.158.104-.312.187-.462C2.592 8.583 4.045 7 5.887 5.8 7.73 4.6 9.767 4 12 4c2.233 0 4.27.6 6.113 1.8 1.841 1.2 3.295 2.783 4.362 4.75a1.906 1.906 0 01.188 1.438 2 2 0 01-.188.462c-1.067 1.967-2.52 3.55-4.363 4.75C16.271 18.4 14.234 19 12 19z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Visibility;
