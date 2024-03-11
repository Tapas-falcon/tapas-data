import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const CardOff = (allProps: IconProps) => {
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
            d="M21.775 18.925L20 17.15V12h-5.15l-4-4H20V6H8.85l-2-2H20c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v12c0 .167-.017.33-.05.488a1.339 1.339 0 01-.175.437zM9.15 12H4v6h11.15l-6-6zM4 20c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 18V6c0-.55.196-1.02.587-1.412A1.926 1.926 0 014 4l2 2H4v2h1.15l-3.8-3.8c-.2-.2-.3-.438-.3-.713 0-.275.1-.512.3-.712.2-.2.437-.3.712-.3.275 0 .513.1.713.3l18.4 18.4c.2.2.3.433.3.7 0 .267-.1.5-.3.7-.2.2-.438.3-.713.3a.973.973 0 01-.712-.3L17.15 20H4z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default CardOff;
