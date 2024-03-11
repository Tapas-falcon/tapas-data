import { IconProps } from "../utils/types";
import { IconWrapper } from "../utils/IconWrapper";

const BakeryDining = (allProps: IconProps) => {
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
            d="M20.875 17.7l-2.475-.85 1.95-5.375 2.125 4.375c.233.45.133.908-.3 1.375-.433.467-.867.625-1.3.475zm-6.275-.95l1.075-9.35c.033-.25.146-.42.337-.513.192-.091.421-.095.688-.012l2.5.925c.233.1.387.25.463.45.075.2.07.417-.013.65l-2.825 7.85H14.6zm-7.4 0L4.375 8.9a.956.956 0 01-.013-.662c.075-.209.23-.355.463-.438l2.5-.925a.8.8 0 01.662-.013c.209.092.33.271.363.538l1.05 9.35H7.2zm-4.3.95c-.433.133-.825-.03-1.175-.488-.35-.458-.408-.912-.175-1.362l2.15-4.375 1.925 5.375-2.725.85zm8-.95L9.7 6a.82.82 0 01.238-.713A.968.968 0 0110.65 5h2.7c.283 0 .52.096.713.287A.82.82 0 0114.3 6l-1.2 10.75h-2.2z"
            fill="currentColor"
          />
        </svg>
      }
      {...restProps}
    />
  );
};
export default BakeryDining;
