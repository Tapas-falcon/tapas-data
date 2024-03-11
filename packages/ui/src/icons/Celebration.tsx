import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const Celebration = (allProps: IconProps) => {
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
            d="M2.7 20L6.475 9.5a1.022 1.022 0 01.95-.675c.133 0 .258.025.375.075.117.05.225.125.325.225l6.75 6.75c.1.1.175.208.225.325a.995.995 0 01-.1.938 1.022 1.022 0 01-.5.387L4 21.3a.815.815 0 01-.575.037 1.158 1.158 0 01-.762-.762A.814.814 0 012.7 20zM23.025 7.025a.72.72 0 01-.525.225.72.72 0 01-.525-.225L21.9 6.95a1.187 1.187 0 00-.875-.35c-.35 0-.642.117-.875.35l-5.075 5.075a.72.72 0 01-.525.225.72.72 0 01-.525-.225.72.72 0 01-.225-.525c0-.2.075-.375.225-.525L19.1 5.9a2.624 2.624 0 011.925-.8c.75 0 1.392.267 1.925.8l.075.075a.72.72 0 01.225.525.72.72 0 01-.225.525zm-13.05-3A.72.72 0 0110.5 3.8c.2 0 .375.075.525.225l.125.125c.533.533.8 1.167.8 1.9 0 .733-.267 1.367-.8 1.9l-.075.075a.72.72 0 01-.525.225.72.72 0 01-.525-.225A.72.72 0 019.8 7.5c0-.2.075-.375.225-.525L10.1 6.9c.233-.233.35-.517.35-.85 0-.333-.117-.617-.35-.85l-.125-.125a.72.72 0 01-.225-.525c0-.2.075-.375.225-.525zm4.05-2a.72.72 0 01.525-.225c.2 0 .375.075.525.225L16.15 3.1c.533.533.8 1.175.8 1.925s-.267 1.392-.8 1.925l-3.075 3.075a.72.72 0 01-.525.225.72.72 0 01-.525-.225.72.72 0 01-.225-.525c0-.2.075-.375.225-.525L15.1 5.9c.233-.233.35-.525.35-.875s-.117-.642-.35-.875l-1.075-1.075a.72.72 0 01-.225-.525c0-.2.075-.375.225-.525zm8 12a.72.72 0 01-.525.225.72.72 0 01-.525-.225L19.9 12.95a1.187 1.187 0 00-.875-.35c-.35 0-.642.117-.875.35l-1.075 1.075a.72.72 0 01-.525.225.72.72 0 01-.525-.225.72.72 0 01-.225-.525c0-.2.075-.375.225-.525L17.1 11.9a2.624 2.624 0 011.925-.8c.75 0 1.392.267 1.925.8l1.075 1.075a.72.72 0 01.225.525.72.72 0 01-.225.525z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default Celebration;