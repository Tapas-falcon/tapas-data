import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const EmoticonUp = (allProps: IconProps) => {
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
            d="M6.5 17c-.433 0-.792-.142-1.075-.425C5.142 16.292 5 15.933 5 15.5c0-.417.142-.77.425-1.063.283-.291.642-.437 1.075-.437.417 0 .77.146 1.063.438.291.291.437.645.437 1.062 0 .433-.146.792-.438 1.075A1.469 1.469 0 016.5 17zm0-7c-.433 0-.792-.142-1.075-.425C5.142 9.292 5 8.933 5 8.5c0-.417.142-.77.425-1.063C5.708 7.146 6.067 7 6.5 7c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062 0 .433-.146.792-.438 1.075A1.468 1.468 0 016.5 10zm4.5 3a.968.968 0 01-.713-.287A.968.968 0 0110 12c0-.283.096-.52.287-.713A.968.968 0 0111 11h2c.283 0 .52.096.713.287.191.192.287.43.287.713s-.096.52-.287.713A.968.968 0 0113 13h-2zm6-1c0-.9-.12-1.767-.363-2.6a8.272 8.272 0 00-1.062-2.3 1.26 1.26 0 01-.2-.775.955.955 0 01.35-.7.87.87 0 01.725-.213c.267.042.483.18.65.413.6.883 1.067 1.846 1.4 2.888.333 1.041.5 2.137.5 3.287 0 .933-.113 1.825-.337 2.675-.226.85-.538 1.658-.938 2.425a.904.904 0 01-.6.475.92.92 0 01-.75-.125.967.967 0 01-.438-.637 1.128 1.128 0 01.113-.788 9.85 9.85 0 00.7-1.925c.167-.667.25-1.367.25-2.1z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default EmoticonUp;
