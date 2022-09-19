class JOB {
	constructor(positionTitle, location, salary) {
		this.title = positionTitle
		this.location = location
		this.salary = salary
	}
	describe() {
		console.log(`I'm a ${this.title} in ${this.location} making ${this.salary}`)
	}
}

const developer = new JOB('Developer', 'NY', 80000)
developer.describe();

