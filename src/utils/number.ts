export function random(start: number, end: number) : number{
  var num = Math.floor(Math.random() * (start - end) + end)
  return num
}