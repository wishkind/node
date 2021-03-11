export default function() {console.log("good");}
export function  a() {console.log("xxx");}

var b = "gggg";
export {b};
setTimeout(() => b = "hello", 1000);

export var c = 100;

