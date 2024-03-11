import { EmoticonDownIcon } from "./icons";

export type NoDataProps = {
    title: string;
    description: string;
    icon?: JSX.Element,
    className?: string,
};

export const NoData: React.FC<NoDataProps> = function({
    icon = <EmoticonDownIcon  fontSize="3.5rem"/>,
    title,
    description,
    className=''
}) {
    return <div className={"flex flex-col justify-start items-center " + className}>
    {icon}
    <span className="text-center text-black text-opacity-50 text-base font-bold font-['Bricolage Grotesque']">
      {title}
    </span>
    <span className="text-center text-black text-opacity-50 text-xs font-normal font-['Bricolage Grotesque']">
      {description}
    </span>
  </div>
};