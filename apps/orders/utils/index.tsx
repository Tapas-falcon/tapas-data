export const priceFormat=(price:number,unit='€')=>{
  return unit+Number(price).toFixed(2).toLocaleString()
}
