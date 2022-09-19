// // // // // // Default var

// // function greetUser(name) {
// // 	console.log('hi ' + name + '!')
// // }

// // greetUser('uzair')

// function greetUser(name = 'user') {
// 	console.log('hi ' + name + '!')
// }

// greetUser('uzair')

// // // // // // rest & spread operator

// // function sumUp(listOfNumbers) {
// // 	let res = 0;
// // 	for (const num of listOfNumbers) {
// // 		res += num
// // 	}
// // 	return res
// // }

// // console.log(sumUp([25,25,25,25]))

// function sumUp(...listOfNums) { // rest operator -> multiple inputs to list
// 	let cum = 0;
// 	for (const num of listOfNums) {
// 		cum += num
// 	}
// 	return cum
// }

// // console.log(sumUp(1,2,3,4,5,6,7,8,9)) -> for rest operator

// const nums = [1,3,5,7,9,11]
// console.log(sumUp(...nums)) // -> for spread operator

// console.log(sumUp)


// // // // // // template literals
// const name = 'uzair'
// // console.log('hi ' + name + '!')

// console.log(`Hi! Just checking in, ${name}`)



// // // // // // primative values
// // numbers strings booleans & more -> undefined


// // // // // // reference values
// // objects

// // const person = {name:'uzair', age:32};
// // function deriveAdultYears(p) {
// // 	return p.age -18
// // }
// // console.log(deriveAdultYears({...person}))
// // console.log(person)

// // // // // // try / catch

const fs = require('fs');
function readFile() {
	try {
		const data = fs.readFileSync('data.json')
	} catch (error){
		console.log('ERROR')
		console.log(error)
	}
	console.log('hello')
};

readFile();