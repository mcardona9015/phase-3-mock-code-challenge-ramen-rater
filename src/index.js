// write your code here
const url = 'http://localhost:3000/ramens'
let ramenArray

fetchRamen().then(renderMenuBar)
fetchRamen().then(ramenArray => renderRamen(ramenArray[0]))

function fetchRamen() {
    return fetch(url)
    .then(res => res.json())
    .then(data => ramenArray = data)
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


   
    ramenRatingForm.dataset.id = ramen.id
    ramenRatingForm.rating.value = ramen.rating
    ramenRatingForm.comment.innerText = ramen.comment


}


ramenRatingForm.addEventListener('submit', updateRamenInfo)

//####### Ramen Rating Update ################//

function updateRamenInfo(e){
    e.preventDefault()
    // console.log(e)
    if (e.target[2].value == 'Update') {
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

    // if (e.target[3].className === 'delete'){
    //     const id = e.target.dataset.id 
    //     fetch(`${url}/${id}`, {
    //         method: 'DELETE',
    //         // headers: {
    //         //     "Content-Type": "application/json"
    //         // },
    //         // body: JSON.stringify()
    //     })
    // }
    
}

//########## Create New Ramen #########//

const ramenCreateForm = document.querySelector('#new-ramen')

ramenCreateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const rating = e.target.rating.value
    const image = e.target.image.value
    const comment = e.target.comment.value
    console.log('comment: ', comment);


    const newRestaurant = {name, restaurant, image, rating, comment} 
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRestaurant)
    })
})

//####### Delete Ramen #######//
const deleteButton = document.querySelector('button')
// deleteButton.innerText = 'Delete'
// deleteButton.className = 'delete'
// ramenDetails.append(deleteButton)

deleteButton.addEventListener('click', (e) => {
    const id = e.target.previousElementSibling.dataset.id
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify()
    })
})

