let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
      
    }
  });
  getToys();
});

const form = document.querySelector('form')
const toyContainer = document.querySelector('#toy-collection')
const likeBtn = document.querySelector('#like-btn')
const likesContainer = document.querySelector('.likey')[0]


function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
  
    toys.forEach(function(toy){
      const divTag = document.createElement('div')
      divTag.className = 'card'
      divTag.innerHTML = `<h2>${toy.name}</h2> 
      <img src=${toy.image} class='toy-avatar'>
      <p id='likey'>${toy.likes} Likes </p> 
      <button class='like-btn'>Like ❤️</button>
      `
      toyContainer.append(divTag)
    })
  })
}

function createToy(event) {
    event.preventDefault()
    const newToy = {
      name: event.target['name'].value,
      image: event.target['image'].value,
      likes: 0
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(toy => {
      const divTag = document.createElement('div')
        divTag.className = 'card'
        divTag.innerHTML = `<h2>${toy.name}</h2> 
        <img src=${toy.image} class='toy-avatar'>
        <p id='likey'>${toy.likes} Likes </p>
        <button class='like-btn'>Like ❤️</button>
        `
        toyContainer.append(divTag)
      })
      form.reset()
}


likeBtn.addEventListener('click', likeNumber)
form.addEventListener('submit', createToy)



//need function to get like button to work
// PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
 
// body: JSON.stringify({
//   "likes": <new number>
// })