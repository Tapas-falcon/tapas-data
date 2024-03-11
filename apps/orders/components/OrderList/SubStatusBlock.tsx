import { useTranslations } from "next-intl";

export type ISubStatusBlockProps = {
    value: string;

};

export const SubStatusBlock: React.FC<ISubStatusBlockProps> = ({
    value,
}) => {
    const orderListTranslate = useTranslations("orderList");
    let borderColor = "";
    let textColor = "";
    let text = value;
    switch (value) {
        case "Submitted":
            borderColor = "border-green-400";
            textColor = "text-green-400";
            text = orderListTranslate("Submitted");
            break;
        case "Awaiting payment":
            borderColor = "border-slate-500";
            textColor = "text-slate-500";
            text = orderListTranslate("AwaitingPayment");
            break;
        case "Not Submitted":
            borderColor = "border-black border-opacity-10";
            textColor = "text-black text-opacity-50";
            text = orderListTranslate("NotSubmitted");
            break;

    }
    return <div className={`p-1 rounded border border-solid ${borderColor} justify-start items-center gap-1 inline-flex`}>
        <div className={`${textColor} text-sm font-normal font-['Bricolage Grotesque']`}>{text}</div>
    </div>;
};