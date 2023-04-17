const countriesArea = document.querySelector('.countries')
const nav = document.querySelector('nav')
const toggle = document.querySelector('.toggle')
const search = document.querySelector('.search')
const dropDown = document.querySelector('.dropDown')
const regions = document.querySelector('.regions')
const dropElem = document.querySelector('.drop')
const region = document.querySelectorAll('.region')
const regionName = document.getElementsByClassName('regionName')
const countryName = document.getElementsByClassName('countryName')

async function getCountry() {
  nav.classList.remove("hider")
  countriesArea.innerHTML = ""
  const data = await fetch("https://restcountries.com/v2/all").then(response => response.json())
  data.forEach(element => {
    showCountry(element)
    console.log(element)
  })
}

function showCountry(element) {
  const country = document.createElement("div")
  country.classList.add("country")
  country.innerHTML = `
    <div class="container-img">
      <img src="${element.flag}" alt="Flag image of ${element.name}">
    </div>
    <div>
      <h5 class="countryName">${element.name}</h5>
      <p><span>Population:</span> ${element.population}</p>
      <p class="regionName"><span>Region:</span> ${element.region}</p>
      <p><span>Capital:</span> ${element.capital}</p>
    </div>
  `
  country.addEventListener('click', () => {
    moreInfo(element)
  })
  countriesArea.appendChild(country)
}

function moreInfo(element) {
  nav.classList.add('hider')
  countriesArea.innerHTML = `
  <div>
    <button class="back" onClick="getCountry()">
      <img class="icon" src="./img/arrow-black.svg" alt="Icon of back">
      <img class="icon hider" src="./img/arrow-white.svg" alt="Icon of back">
      Back
    </button>

    <div class="container">
      <div>
        <img src="${element.flag}" alt="Flag image of ${element.name}">
      </div>

      <div>
        <h1>${element.name}</h1>

        <div class="info">
          <div>
            <p><span>Native Name:</span> ${element.nativeName}</p>
            <p><span>Population:</span> ${element.population}</p>
            <p><span>Region:</span> ${element.region}</p>
            <p><span>Sub Region:</span> ${element.subregion}</p>
            <p><span>Capital:</span> ${element.capital}</p>
          </div>

          <div>
            <p><span>Top Level Domain:</span> ${element.topLevelDomain.map(element => element)}</p>
            <p><span>Currencies:</span> ${element.currencies.map(element=>element.name)}</p>
            <p><span>Languages:</span> ${element.languages.map(element => element.name)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}

function darkMode() {
  document.body.classList.toggle("dark")
  const icons = document.querySelectorAll('.icon')
  icons.forEach(icon => {
    icon.classList.toggle('hider')
  })
}

search.addEventListener("input", () => {
  Array.from(countryName).forEach(elem => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid"
    } else {
      elem.parentElement.parentElement.style.display = "none"
    }
  })
})

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown")
})

region.forEach(element => {
  element.addEventListener("click", () => {
    regions.innerHTML= element.innerText
    Array.from(regionName).forEach(elem => {
      if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
        elem.parentElement.parentElement.style.display = "grid"
      } else {
        elem.parentElement.parentElement.style.display = "none"
      }
    })
  })
})

getCountry()