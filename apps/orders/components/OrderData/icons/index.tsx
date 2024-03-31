import React, {SVGAttributes} from "react";
export const IconComplete:React.FC<any>=(props:any)=>{
  let {size=20}=props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={"100%"} height={"100%"} style={{width:size,height:size}} viewBox={`0 0 20 20`} fill="none" {...props}>
      <path d="M8.83366 11.4998L7.04199 9.70817C6.88921 9.55539 6.69477 9.479 6.45866 9.479C6.22255 9.479 6.0281 9.55539 5.87533 9.70817C5.72255 9.86095 5.64616 10.0554 5.64616 10.2915C5.64616 10.5276 5.72255 10.7221 5.87533 10.8748L8.25033 13.2498C8.41699 13.4165 8.61144 13.4998 8.83366 13.4998C9.05588 13.4998 9.25033 13.4165 9.41699 13.2498L14.1253 8.5415C14.2781 8.38873 14.3545 8.19428 14.3545 7.95817C14.3545 7.72206 14.2781 7.52762 14.1253 7.37484C13.9725 7.22206 13.7781 7.14567 13.542 7.14567C13.3059 7.14567 13.1114 7.22206 12.9587 7.37484L8.83366 11.4998ZM10.0003 18.3332C8.84755 18.3332 7.76421 18.1144 6.75033 17.6769C5.73644 17.2394 4.85449 16.6457 4.10449 15.8957C3.35449 15.1457 2.76074 14.2637 2.32324 13.2498C1.88574 12.2359 1.66699 11.1526 1.66699 9.99984C1.66699 8.84706 1.88574 7.76373 2.32324 6.74984C2.76074 5.73595 3.35449 4.854 4.10449 4.104C4.85449 3.354 5.73644 2.76025 6.75033 2.32275C7.76421 1.88525 8.84755 1.6665 10.0003 1.6665C11.1531 1.6665 12.2364 1.88525 13.2503 2.32275C14.2642 2.76025 15.1462 3.354 15.8962 4.104C16.6462 4.854 17.2399 5.73595 17.6774 6.74984C18.1149 7.76373 18.3337 8.84706 18.3337 9.99984C18.3337 11.1526 18.1149 12.2359 17.6774 13.2498C17.2399 14.2637 16.6462 15.1457 15.8962 15.8957C15.1462 16.6457 14.2642 17.2394 13.2503 17.6769C12.2364 18.1144 11.1531 18.3332 10.0003 18.3332Z" fill="#57B07B"/>
    </svg>
  );
}