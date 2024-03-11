import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const CardMembership = (allProps: IconProps) => {
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
            d="M4 13v2h16v-2H4zM4 2h16c.55 0 1.02.196 1.413.587C21.803 2.98 22 3.45 22 4v11c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0120 17h-4v3.375c0 .383-.158.67-.475.863a.952.952 0 01-.975.037l-2.1-1.05A.832.832 0 0012 20.1a.832.832 0 00-.45.125l-2.1 1.05a.952.952 0 01-.975-.037c-.317-.192-.475-.48-.475-.863V17H4c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 012 15V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 014 2zm0 8h16V4H4v6z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default CardMembership;
