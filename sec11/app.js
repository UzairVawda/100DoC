let list = ['one', 'two', 3];
let job = {
	title: 'dev',
	place: 'NY',
	salary: 500000
};

function caculateAdultYears(age) {
	return age - 18;
};

console.log(caculateAdultYears(20));
console.log(caculateAdultYears(22));
console.log(caculateAdultYears(92));

let person = {
	name: 'Uzair', // Property
	greet() { //method
		console.log('hello')
	},

}
person.greet()