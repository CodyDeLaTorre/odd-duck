'use strict';

let myContainer = document.getElementById('images');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let userVoted = 0;
let maxVotes = 26;
let results = document.querySelector('ul');
let resultsButton = document.getElementById('results');


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `images/${this.name}.${this.fileExtension}`;
  this.views = 0;
  this.score = 0;
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dog = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let pet = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water = new Product('water-can');
let wine = new Product('wine-glass');

let products = [bag, banana, bathroom, boots, bubblegum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, sweep, tauntaun, unicorn, water, wine];

function randomProduct() {
  return Math.floor((Math.random() * products.length));
}

function renderProducts() {
  let product1 = randomProduct();
  let product2 = randomProduct();
  let product3 = randomProduct();

  while (product1 === product2 || product1 === product3) {
    product1 = randomProduct();
  }
  while (product2 === product1 || product2 === product3) {
    product2 = randomProduct();
  }


  image1.src = products[product1].src;
  image1.alt = products[product1].name;
  products[product1].views++;
  image2.src = products[product2].src;
  image2.alt = products[product2].name;
  products[product2].views++;
  image3.src = products[product3].src;
  image3.alt = products[product3].name;
  products[product3].views++;
}

function handleClick(e) {
  userVoted++;
  for (let i = 0; i < products.length; i++) {
    if (e.target.alt === products[i].name) {
      products[i].score++;
      console.log(products[i]);
      break;
    }
  }
  if (maxVotes === userVoted) {
    myContainer.removeEventListener('click', handleClick);
  } else {
    renderProducts();
  }
}

function renderResults() {
  if (userVoted !== maxVotes) {
    resultsButton.removeEventListener('click', renderResults);
  } else if (userVoted === maxVotes) {
    for (let i = 0; i < products.length; i++) {
      resultsButton.addEventListener('click', renderResults);
      let li = document.createElement('li');
      li.textContent = `${products[i].name} had ${products[i].views} views and ${products[i].score} votes`;
      results.appendChild(li);
      console.log(li);
    }
  }
}


myContainer.addEventListener('click', handleClick);

renderProducts();

resultsButton.addEventListener('click', renderResults);
