export const priceFormat=(price:number,unit='€')=>{
  return unit+Number(price??0).toFixed(2).toLocaleString()
}
