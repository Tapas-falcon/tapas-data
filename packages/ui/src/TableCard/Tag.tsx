import React from "react";

export const Tag: React.FC<{ text: string }> = function ({ text }) {
    return (
        <div className="h-6 box-border p-1 bg-black bg-opacity-5 rounded justify-start items-center gap-1 inline-flex">
            <div className="text-black text-opacity-50 text-xs font-normal font-['Bricolage Grotesque']">{text}</div>
        </div>
    )
}