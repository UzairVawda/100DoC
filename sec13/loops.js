let sum = 0
for (let z=10; z>0; z--) {
	sum += z
}
console.log(sum)

const users = ['max', 'uzair', 'jane']
for (const user of users) {
	console.log(user)
}

const loggedInUser = {
	'name': 'uzair vawda',
	'age': 55,
	isAdmin: false
}

for (const key in loggedInUser) {
	console.log(key)
	console.log(loggedInUser[key])
}

let isFinish = false

while (!isFinish) {
	isFinish = confirm('quit')
}

console.log('done')