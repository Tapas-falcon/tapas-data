import { IStatusTagProps, StatusColor, TableStatus } from "./types";

export const StatusTag: React.FC<IStatusTagProps> = function({
    color='green',
    text=TableStatus.Available
}) {
    return (
        <div className="h-3.5 justify-start items-center gap-1 inline-flex">
            <div className={`w-2 h-2 ${StatusColor[color]} rounded-full border border-white border-opacity-50`}></div>
            <div className="text-black text-opacity-50 text-xs font-normal font-['Bricolage Grotesque']">{text}</div>
        </div>
    )
}