// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course
let courseName = "FrontEnd Development"
let coursePrice = 29.99
let courseGoals = ["HTML", "CSS", "JavaScript"]
// 2) Output ("alert") the three variable values
alert(courseName + " " + coursePrice + " " + courseGoals)
// 3) Try "grouping" the three variables together and still output their values thereafter
let course = {
	name: "FrontEnd Development",
	price: 29.99,
	goal: ["HTML", "CSS", "JavaScript"]
}
// 4) Also output the second element in your "main goals" variable
console.log(course.name)
console.log(course.price)
console.log(course.goal[1])
// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible 
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work 
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)

function getSpecificGoal(list, index) {
	return list[index]
}

console.log(getSpecificGoal(course.goal,1))