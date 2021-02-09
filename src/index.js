// write your code here
const url = 'http://localhost:3000/ramens'
let ramenArray

fetchRamen()

function fetchRamen() {
     fetch(url)
    .then(res => res.json())
    .then(data => ramenArray = data)
    .then(ramenArray => renderMenuBar(ramenArray))
    // .then(ramenArray => renderAllRamen(ramenArray))
}


// Render Ramen//

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const ramenRatingForm = document.querySelector('#ramen-rating')


function renderMenuBar(ramenArray) {
    ramenArray.forEach(ramen =>{
        renderMenuImage(ramen)
    })
}

function renderMenuImage(ramen){

    const image = document.createElement('img')
    image.src = ramen.image
    image.alt = ramen.name
    image.dataset.id = ramen.id
    ramenMenu.append(image)
}

ramenMenu.addEventListener('click', showRamenInfo)

function showRamenInfo(e){
    if(e.target.tagName === 'IMG'){
        const imageId = e.target.dataset.id
        const ramen = ramenArray.find(ramen => ramen.id == imageId)
        Array.from(ramenDetails.children).forEach(ramen => ramen.remove())
        renderRamen(ramen)
    }
}

function renderRamen(ramen) {
    const ramenContainer = document.createElement('div')
    ramenContainer.dataset.id = ramen.id
    ramenContainer.className = 'ramen-container'

    const image = document.createElement('img')
    image.src = ramen.image
    image.alt = ramen.name
    image.className = 'detail-image'
    
    const name = document.createElement('h2')
    name.className = 'name'
    name.innerText = ramen.name

    const restaurantName = document.createElement('h3')
    restaurantName.className = 'restaurant'
    restaurantName.innerText = ramen.restaurant

    ramenDetails.append(image, name, restaurantName) 
    ramenDetails.append(ramenContainer)

    //####### Ramen Rating Update ################//
    ramenRatingForm.dataset.id = ramen.id
    ramenRatingForm.rating.value = ramen.rating
    ramenRatingForm.comment.innerText = ramen.comment

}

// Create New Ramen

ramenRatingForm.addEventListener('submit', updateRamenInfo)

function updateRamenInfo(e){
    e.preventDefault()
    console.log('e: ', e);
    const rating = e.target.rating.value
    const comment = e.target.comment.value
    const id = e.target.dataset.id 
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({rating, comment})
    })
}