import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Mollusc = (allProps: IconProps) => {
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
            d="M10.137 4.158a4.015 4.015 0 013.726 0l1.162 2.78-2.01 7.325a.7.7 0 101.35.37l2.01-7.325a3.88 3.88 0 00.114-1.47l.2.068.602.209c1.08.375 1.783 1.443 1.773 2.6a2.847 2.847 0 01-.525 1.617l-3.494 4.85a.7.7 0 101.135.82l3.495-4.851a4.168 4.168 0 00.652-1.39c.8.515 1.193 1.574.847 2.565a2.162 2.162 0 01-.41.71l-.18.205a24.379 24.379 0 01-3.565 3.342 23.94 23.94 0 01-2.104 1.436L12 19.79l-2.916-1.77a23.93 23.93 0 01-2.125-1.454 24.385 24.385 0 01-3.544-3.325l-.179-.205c-.767-.879-.702-2.246.137-3.04.093-.088.193-.166.299-.234.127.488.343.96.652 1.389L7.818 16a.7.7 0 001.136-.818l-3.494-4.85a2.79 2.79 0 01-.524-1.61 2.765 2.765 0 011.043-2.21c.222-.173.468-.307.729-.398l.602-.21.2-.067a3.88 3.88 0 00.114 1.47l2.01 7.326a.7.7 0 001.35-.37l-2.01-7.327a2.478 2.478 0 01.103-1.612 2.32 2.32 0 011.06-1.167zM5.834 17.465a25.803 25.803 0 01-3.474-3.304l-.179-.204c-1.257-1.441-1.158-3.664.23-4.978.328-.31.713-.553 1.134-.713h.001l.012-.005A4.135 4.135 0 015.117 5.41a3.936 3.936 0 011.132-.618l.602-.209c.408-.141.819-.265 1.233-.372.34-.536.817-.988 1.406-1.295a5.415 5.415 0 015.019 0c.59.308 1.066.76 1.406 1.295l4.526 4.044v.007l.012.004-.012-.011.013.011c1.787.677 2.675 2.71 2.042 4.522-.15.43-.38.827-.678 1.168l-.18.205a25.805 25.805 0 01-3.473 3.305v1.827c0 1.302-1.021 2.407-2.34 2.407H8.174c-1.318 0-2.34-1.104-2.34-2.407v-1.828zm1.4 1.027v.8c0 .584.447 1.008.94 1.008h1.968l-1.785-1.084-.105-.064a25.301 25.301 0 01-1.018-.66zm6.623 1.808h1.968c.493 0 .94-.424.94-1.007v-.8a24.154 24.154 0 01-1.123.723L13.858 20.3zm6.584-12.045L15.915 4.21c.415.107.826.231 1.233.372l.602.21c1.532.531 2.53 1.92 2.69 3.462zm-6.578-4.097l1.162 2.78a2.477 2.477 0 00-.102-1.612 2.319 2.319 0 00-1.06-1.168z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Mollusc;
