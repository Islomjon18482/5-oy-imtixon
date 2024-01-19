const block = document.querySelector(".all__cards")
const list = document.querySelectorAll("li")
const inp = document.querySelector(".country")
const mode = document.querySelector(".mode")
const body = document.querySelector("body")

function creat(data) {
    return `
    <div class="card" id="${data.name.slug}">
    <div class="card__img">
    <img class="width" src="${data.flags.png}" alt="">                
    </div>
    <div class="card__text">
    <h4>${data.name.common}</h4>
    <p class="key">Population:<span class="value"> ${data.population}</span></p>
    <p class="key">Region:<span class="value"> ${data.region}</span></p>
    <p class="key">Capital:<span class="value"> ${data.capital}</span></p>
    </div>
    </div>
    `
}


async function callAll() {
    try {
        const data = await fetch("https://countries-api-v7sn.onrender.com/countries?limit=250");
        const data_1 = await data.json();
        data_1.data.forEach(element => {
            let card = creat(element);
            block.innerHTML += card;
        });
        const card_1 = document.querySelectorAll(".card");
        card_1.forEach(card_2 => {
            card_2.addEventListener("click", function () {
                let cardId = this.getAttribute("id");
                if(body.getAttribute("class") == "dark"){
                    window.location.assign(`./pages/country.html?${cardId}/dark`);
                }else{
                    window.location.assign(`./pages/country.html?${cardId}/white`);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    callAll()
})


list.forEach(li => {
    li.addEventListener("click", function () {
        let countrsLocation = this.innerText;

        // To go to the page showing all countries
        if (countrsLocation == "All") {
            callAll()
        }


        fetch(`https://countries-api-v7sn.onrender.com/countries?region=${countrsLocation}`)
            .then(data => data.json())
            .then(data => {
                block.innerHTML = ""
                data.data.forEach(el => {
                    let card = creat(el)
                    block.innerHTML += card
                })
                const card = document.querySelectorAll(".card")
                card.forEach(card => {
                    card.addEventListener("click", function () {
                        let cardId = this.getAttribute("id")
                        window.location.assign(`./pages/country.html?${cardId}`)
                    })
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
})

function getValue() {
    let value = inp.value;
    fetch(`https://countries-api-v7sn.onrender.com/countries?search=${value}`)
    .then(data => data.json())
    .then(data =>{
        block.innerHTML = ''
        data.data.forEach(element => {
            let card = creat(element)
            block.innerHTML += card
        });
        const card_1 = document.querySelectorAll(".card");
        card_1.forEach(card_2 => {
            card_2.addEventListener("click", function () {
                let cardId = this.getAttribute("id");
                window.location.assign(`./pages/country.html?${cardId}`);
            });
        });
    })
    .catch(err =>{
        console.log(err);
    })
}

mode.addEventListener('click', function(){
    body.classList.toggle("dark")
})