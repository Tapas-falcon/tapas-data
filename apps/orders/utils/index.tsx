export const priceFormat=(price:number,unit='€',len:number=2)=>{
  return unit+Number(price??0).toFixed(len).toLocaleString()
}
