/**
 Счастливым билетом называют такой билет с шестизначным номером,
 где сумма первых трех цифр равна сумме последних трех.

 Напишите функцию checkTicket(number) которая проверяет счастливость билета.

 */

function numberOfSum(numberArr) {
    // return numberArr.reduce((acc, cur) => acc += +cur, 0)
    let result = 0;
    numberArr.forEach(el => {
        result = result + Number(el)
    })

    return result;
}

function checkTicket(number) {
    const leftSide = number.split('').slice(0, number.length / 2)
    const rightSide = number.split('').slice(number.length / 2, number.length)

    return numberOfSum(leftSide) === numberOfSum(rightSide);
}

console.log(checkTicket('005212')); // true
console.log(checkTicket('133700')); // true
console.log(checkTicket('123032')); // false