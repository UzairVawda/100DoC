// document.body.children[1].children[0].href = 'www.facebook.com';
// console.log(document.body.children[1].children[0].href)


// let externalLink = document.getElementById('link')
// console.log(externalLink.href)
// externalLink.href = "www.facebook.com"
// console.log(externalLink.href)

// create element
let spacer = document.createElement('br')
let newAnchor = document.createElement('a')
newAnchor.href = 'www.google.com'
newAnchor.textContent = 'www.google.com'
// get parent
let parent = document.querySelector('p')
// teather
parent.append(spacer)
parent.append(newAnchor)

//find el
let getSpacer = document.querySelector('br')
//remove
getSpacer.remove()

//move
parent.parentElement.append(parent)

console.log(parent.innerHTML)