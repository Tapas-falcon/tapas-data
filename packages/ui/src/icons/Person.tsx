import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Person = (allProps: IconProps) => {
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
            d="M12 12c-1.1 0-2.042-.392-2.825-1.175C8.392 10.042 8 9.1 8 8s.392-2.042 1.175-2.825C9.958 4.392 10.9 4 12 4s2.042.392 2.825 1.175C15.608 5.958 16 6.9 16 8s-.392 2.042-1.175 2.825C14.042 11.608 13.1 12 12 12zm-8 6v-.8c0-.567.146-1.087.438-1.563.291-.475.679-.837 1.162-1.087a14.843 14.843 0 013.15-1.163A13.76 13.76 0 0112 13c1.1 0 2.183.13 3.25.387 1.067.259 2.117.646 3.15 1.163.483.25.87.612 1.163 1.087.291.476.437.996.437 1.563v.8c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0118 20H6c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 014 18z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Person;
