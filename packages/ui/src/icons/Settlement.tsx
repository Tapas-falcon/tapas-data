import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Settlement = (allProps: IconProps) => {
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
            d="M18 18c.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062 0-.417-.146-.77-.438-1.063A1.446 1.446 0 0018 15c-.417 0-.77.146-1.063.438A1.446 1.446 0 0016.5 16.5c0 .417.146.77.438 1.063.291.291.645.437 1.062.437zm0 3c.5 0 .967-.117 1.4-.35a3.011 3.011 0 001.075-.975 4.455 4.455 0 00-1.2-.512 5.048 5.048 0 00-2.55 0c-.417.108-.817.279-1.2.512.283.417.642.742 1.075.975.433.233.9.35 1.4.35zm0 2c-1.383 0-2.563-.488-3.537-1.462C13.488 20.562 13 19.383 13 18s.488-2.563 1.463-3.537C15.438 13.488 16.617 13 18 13s2.563.488 3.538 1.463C22.512 15.438 23 16.617 23 18s-.488 2.563-1.462 3.538C20.562 22.512 19.383 23 18 23zM8 9h8c.283 0 .52-.096.712-.287A.967.967 0 0017 8a.967.967 0 00-.288-.713A.968.968 0 0016 7H8a.968.968 0 00-.713.287A.968.968 0 007 8c0 .283.096.52.287.713.192.191.43.287.713.287zm3.675 12H5c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 013 19V5c0-.55.196-1.02.587-1.413A1.926 1.926 0 015 3h14c.55 0 1.02.196 1.413.587C20.803 3.98 21 4.45 21 5v6.7a7.168 7.168 0 00-1.462-.525A6.637 6.637 0 0018 11c-.183 0-.354.004-.512.012-.159.009-.321.03-.488.063a2.924 2.924 0 00-.5-.063c-.183-.008-.35-.012-.5-.012H8a.967.967 0 00-.713.287A.968.968 0 007 12c0 .283.096.52.287.713.192.191.43.287.713.287h5.125c-.3.283-.57.592-.813.925A6.889 6.889 0 0011.675 15H8a.967.967 0 00-.713.287A.968.968 0 007 16c0 .283.096.52.287.712.192.192.43.288.713.288h3.075c-.033.167-.054.33-.063.488-.008.158-.012.329-.012.512 0 .55.05 1.063.15 1.538.1.474.275.962.525 1.462z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Settlement;
