import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const WarningFilled = (allProps: IconProps) => {
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
            d="M2.725 21a.973.973 0 01-.85-.5 1.098 1.098 0 01-.138-.488.898.898 0 01.138-.512l9.25-16c.1-.167.23-.292.387-.375.159-.083.321-.125.488-.125.167 0 .33.042.488.125a.983.983 0 01.387.375l9.25 16c.1.167.146.337.137.512a1.099 1.099 0 01-.137.488.974.974 0 01-.85.5H2.725zM12 18c.283 0 .52-.096.713-.288A.968.968 0 0013 17a.968.968 0 00-.287-.712A.968.968 0 0012 16a.967.967 0 00-.713.288A.968.968 0 0011 17c0 .283.096.52.287.712.192.192.43.288.713.288zm0-3c.283 0 .52-.096.713-.287A.968.968 0 0013 14v-3a.968.968 0 00-.287-.713A.968.968 0 0012 10a.967.967 0 00-.713.287A.968.968 0 0011 11v3c0 .283.096.52.287.713.192.191.43.287.713.287z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default WarningFilled;
