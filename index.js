document.addEventListener("DOMContentLoaded", () => { 
    getBreweries('golden')
})

function getBreweries(location) {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${location}&per_page=50`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(res =>  res.json())
    .then(breweries => breweries.map(brewery => {
        let li = document.createElement('li')
        let p = document.createElement('p')
        p.setAttribute('id',`${brewery.id}`)
        p.textContent = brewery.name
        let favBtn = document.createElement('button')
        favBtn.addEventListener('click', addToFavList)
        favBtn.textContent = 'Add'
        li.appendChild(p)
        li.appendChild(favBtn)
        document.querySelector('#breweries-list').appendChild(li)
    }))
}

let form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
    e.preventDefault()
    getBreweries(e.target.city.value)
    form.reset()
    })

function addToFavList(e) {
    let favList = document.querySelector('#favorite-list')
    let li = document.createElement('li')
    let breweryName = e.target.parentNode.innerText
    li.textContent = breweryName
    let btn = document.createElement('button')
    btn.addEventListener('click', btnDelete)
    btn.textContent = 'x'
    li.appendChild(btn)
    favList.appendChild(li)
}

function btnDelete(e){
    e.target.parentNode.remove()
  }
  