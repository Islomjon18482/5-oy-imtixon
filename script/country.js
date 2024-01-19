let url = window.location.href
let cut = url.lastIndexOf("?")
let to = url.lastIndexOf("/")
let countryName = ''
if(to>=cut){
    countryName = url.substring(cut+1, to)
}else{
    countryName = url.substring(cut+1)
}
let className = url.substring(to+1) 
const main = document.querySelector(".main")
const btn = document.querySelector(".wrapper")
const body = document.querySelector("body")
const mode = document.querySelector(".mode")

body.classList.toggle(`${className}`)

// To go to the main page
btn.addEventListener("click", function(){
    window.location.assign("../index.html")
})

// For complete country information
function creatMoreinfo(data){
    return `
    <div class="block">
    <div class="flag">
        <img src="${data.flags.png}" alt="">
    </div>
    <div class="country__text">
        <h3>${data.name.common}</h3>
        <div class="navigation">
            <div class="location">
                <p>Native Name: <span>${data.languages}</span></p>
                <p>Population: <span>${data.population}</span></p>  
                <p>Region: <span>${data.region}</span></p>
                <p>Sub Region: <span>${data.subregion}</span></p>
                <p>Capital: <span>${data.capital}</span> </p>
            </div>
            <div class="more__info">
                <p>Top Level Domain:<span>.be</span></p>
                <p>Currencies: <span>${data.currencies}</span></p>
                <p>Languages: <span>${data.languages}</span></p>
            </div>
        </div>
        <div class="near">
        <div class="other">
        <span>Border Countries:</span>
            ${
                data.borders.map(element => {
                    return `<button class="nearBy" id="${element.common}">${element.common}</button>`
                })
            }
        </div>
        </div>
    </div>
        
    </div>
    `
}


document.addEventListener("DOMContentLoaded", function(){
    fetch(`https://countries-api-v7sn.onrender.com/countries/slug/${countryName}`)
    .then(data => data.json())
    .then(data =>{
        let card = creatMoreinfo(data)
        main.innerHTML = card
        const borderCountry = document.querySelectorAll(".nearBy")
        borderCountry.forEach(el =>{
            el.addEventListener("click", function(){
                let elId = this.getAttribute("id")
                fetch(`https://countries-api-v7sn.onrender.com/countries?search=${elId}`)
                .then(data => data.json())
                .then(data =>{
                    let slug = data.data[0].name.slug;
                    window.location.assign(`./country.html?${slug}/${className}`)
                })
                .catch(err =>{
                    console.log(err);
                })
            })
        })
    })
    .catch(err =>{
        console.log(err);
    })
})

mode.addEventListener("click", function(){
    body.classList.toggle("dark")
})