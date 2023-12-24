/**
 Напишите функцию isPalindrome(value) определяющую,
 является ли переданная строка палиндромом, то есть строкой,
 которая одинаково читается слева направо и справа налево.
 
 */

function isPalindrome(value) {
    return value.split('').reverse().join('') === value;
}

console.log(isPalindrome('121'));
console.log(isPalindrome('boob'));
console.log(isPalindrome('true'));