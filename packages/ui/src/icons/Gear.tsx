import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Gear = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps;
  return (
    <IconWrapper
      icon={
        <svg
          width="inherit"
          height="inherit"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <g clipPath="url(#prefix__clip0_128_14)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.7 6.715l-2.016-.367c-.122-.427-.306-.794-.49-1.16l1.161-1.71c.122-.184.122-.367 0-.49L12.95 1.644a.296.296 0 00-.427 0l-1.65 1.16c-.427-.183-.793-.366-1.221-.488L9.285.3c0-.183-.183-.306-.366-.306H7.025c-.183 0-.305.122-.305.306l-.367 2.016c-.427.122-.794.305-1.221.489l-1.65-1.16a.296.296 0 00-.427 0L1.65 2.987c-.061.122-.122.306 0 .49l1.16 1.649c-.183.427-.366.794-.489 1.221l-2.015.367c-.183 0-.306.121-.306.305v1.894c0 .183.122.366.306.366l2.015.367c.122.427.306.794.49 1.221l-1.161 1.65a.296.296 0 000 .427l1.344 1.405c.122.122.306.122.489 0l1.65-1.16c.427.183.793.366 1.22.489l.367 2.015c0 .183.122.306.306.306H8.92c.183 0 .366-.122.366-.306l.366-2.015c.428-.122.794-.306 1.222-.49l1.71 1.161a.296.296 0 00.428 0l1.345-1.405a.378.378 0 00.06-.427l-1.22-1.711c.182-.366.366-.733.488-1.16l2.016-.367c.183 0 .305-.183.305-.366V7.02c0-.183-.122-.305-.305-.305h-.002zM8.002 4.393c2.015 0 3.665 1.588 3.665 3.605a3.676 3.676 0 01-3.665 3.665 3.676 3.676 0 01-3.666-3.665c0-2.016 1.65-3.605 3.666-3.605z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="prefix__clip0_128_14">
              <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  );
};
export default Gear;