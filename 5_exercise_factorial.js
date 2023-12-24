/*
Факториал — это произведение всех натуральных чисел от 1 до данного числа.
Например, факториал числа 5 будет равен 1 × 2 × 3 × 4 × 5 = 120

Напишите функцию factorial(number) факториал числа
 
*/


// function factorial(n) {
//   if (n <= 1) {
//     return 1;
//   }

//   return n * factorial(n - 1);
// }

function factorial(n) {
  let result = 1;

  for(let i = 1; i <= n; i++) {
    result = result * i;
  }

  return result;
}

console.log(factorial(4)); // 24
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
