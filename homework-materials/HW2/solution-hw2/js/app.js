class Bun { 
    constructor(glazing, price){
        this.glazing = glazing;
        this.price = price;
    }
}

const basePrice = 2.49

let glazes = [
    new Bun('Keep original', 0),
    new Bun('Sugar milk', 0),
    new Bun('Vanilla milk', 0.5),
    new Bun('Double chocolate', 1.5),
]

function glazeChange(data) {
    let glazingOption = document.querySelector('#glazing-options');
    for (let i = 0; i < data.length; i++) {
      let glazing = document.createElement('option')
      glazing.innerText = data[i].glazing
      glazing.value = data[i].price
      glazingOption.appendChild(glazing)
    }
}

glazeChange(glazes)

class Pack { 
    constructor(size){
        this.size = size;
    }
}

let sizes = [
    new Pack (1),
    new Pack (3),
    new Pack (6),
    new Pack (10),
]

function packChange(data) {
    let packOption = document.querySelector('#pack-size');
    for (let i = 0; i < data.length; i++) {
      let pack = document.createElement('option')
      pack.innerText = data[i].size
      pack.value = data[i].size
      packOption.appendChild(pack)
    }
}

packChange(sizes)

function priceChange(){
    let glazingOption = document.querySelector('#glazing-options');
    let price = document.querySelector('#price');
    price.innerText = (basePrice + parseFloat(glazingOption.value)) * parseFloat(packOption.value);
    price.innerText = '$' + price.innerText
}

let glazingOption = document.querySelector('#glazing-options');
glazingOption.addEventListener('change', priceChange);

let packOption = document.querySelector('#pack-size');
packOption.addEventListener('change', packChange)



