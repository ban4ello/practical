/**
 В доме решили провести перепись всех жильцов и составили список,
 в котором указали возраст, имя и пол каждого жильца.
 *
 Напишите функцию census(list) возвращающую имя самого старшего жителя мужского пола.
 
 */

function census(list) {
  let oldestUser = { age: 0 };

  list.forEach(currentUser => {
    if (currentUser.gender === 'Male' && currentUser.age > oldestUser.age) {
      oldestUser = currentUser
    }
  })

  return oldestUser.name;
}

// function census(list) {
//   const oldestUser = list.reduce((acc, cur) => {
//     if (cur.gender === 'Male' && cur.age > acc.age) {
//       acc = cur
//     }
//     return acc
//   })

//   return oldestUser.name;
// }


console.log(census([
  { age: 12, name: 'Bob', gender: 'Male' },
  { age: 40, name: 'Foo', gender: 'Male' }
])); // 'Foo'
console.log(census([{ age: 40, name: 'Bob', gender: 'Female' }])); // 'undefined'
