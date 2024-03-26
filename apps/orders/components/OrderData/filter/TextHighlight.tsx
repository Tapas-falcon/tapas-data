import React  from "react";
export interface HighlightProps{
  text:string;
  htext:string;//高亮的文字
  color?:string;//普通颜色
  hcolor?:string;//高亮颜色
}
export const TextHighlight:React.FC<HighlightProps>=({text,htext,color=`rgba(0,0,0,0.54)`,hcolor=`rgba(0,0,0,1)`})=>{
  return (
    <span style={{color}} dangerouslySetInnerHTML={{__html:text.replace(htext,`<span style="color: ${hcolor}">${htext}</span>`)}}/>
  );
}
