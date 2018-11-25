console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){
  const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
  const dogImgContainer = document.getElementById('dog-image-container')
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  const dogBreedUl = document.getElementById('dog-breeds')
  const breedDropdown = document.getElementById('breed-dropdown')
  let allBreeds = []

  dogBreedUl.addEventListener('click', (event) => {
    event.target.style.color = 'red';
  })

  breedDropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value
    const filteredBreeds = allBreeds.filter((breed) => {
      return breed.startsWith(selectedLetter)
    })
    dogBreedUl.innerHTML = createDogLis(filteredBreeds)
})


  fetch(imgUrl, { method: 'GET' })
  .then(function(response){
    if (response.ok){
      return response.json()
    }
  })
  .then(function(dogImgData){
    // dogImgData.message.forEach(function(imgUrl){
    //   dogImgContainer.innerHTML += `<img src=${imgUrl}>`
    // })
    const dogImgString = dogImgData.message.map((imgUrl) => `<img src="${imgUrl}">`)
    dogImgContainer.innerHTML = dogImgString.join('')
  })

  fetch(breedUrl, { method: 'GET'})
    .then((resp) => resp.json())
    .then((breedData) => {
      allBreeds = Object.keys(breedData.message)
      dogBreedUl.innerHTML = createDogLis(allBreeds)
    })
})

function createDogLis(dogBreedArray) {
  const dogLiStringArray =  dogBreedArray.map(function(breed) {
    // return the string below to our map function callback
    return `<li>${breed}</li>`
  })
  // join so we don't have commas on the page
  return dogLiStringArray.join('')
}
