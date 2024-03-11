import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Fastfood = (allProps: IconProps) => {
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
          <g clipPath="url(#prefix__clip0_270_2176)">
            <path
              d="M19.8 17.171H4.2c-.66 0-1.2.524-1.2 1.165 0 .64.54 1.164 1.2 1.164h15.6c.66 0 1.2-.524 1.2-1.164 0-.64-.54-1.165-1.2-1.165zM4.32 11.998h15.36c.744 0 1.332-.652 1.188-1.35C20.088 6.885 16.044 5 12 5c-4.044 0-8.076 1.886-8.868 5.647-.144.699.456 1.35 1.188 1.35zM19.8 13.42H4.2c-.66 0-1.2.524-1.2 1.165 0 .64.54 1.164 1.2 1.164h15.6c.66 0 1.2-.524 1.2-1.165 0-.64-.54-1.164-1.2-1.164z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_270_2176">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default Fastfood;
