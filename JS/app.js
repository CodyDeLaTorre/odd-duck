'use strict';

let myContainer = document.getElementById('images');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let userVoted = 0;
let maxVotes = 25;
let indexArray = [];


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

  while (indexArray.length < 5) {
    let ranNum = randomProduct();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }


  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();

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
      break;
    }
  }
  if (maxVotes === userVoted) {
    myContainer.removeEventListener('click', handleClick);
    renderChart();
    storeProducts();
  } else {
    renderProducts();
  }
}

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productScore = [];

  for (let i = 0; i < products.length; i++) {
    productNames.push(products[i].name);
    productViews.push(products[i].views);
    productScore.push(products[i].score);
  }

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Views',
      data: productViews,
      backgroundColor: [
        '#6e15b5',
        '#ad00a2',
        '#d8008a',
        '#f5006f',
        '#ff2755',
        '#ff5a3b',
        '#ff8221'
      ],
      borderColor: [
        '#24073b',
        '#500949',
        '#7b0c50',
        '#a51b50',
        '#c93549',
        '#e5573c',
        '#f87d28'
      ],
      borderWidth: 1
    }, {
      label: 'Votes',
      data: productScore,
      backgroundColor: [
        '#316687',
        '#506da3',
        '#836db3',
        '#ba68b0',
        '#ea639a',
        '#ff6976',
        '#ff8249'
      ],
      borderColor: [
        '#152c3b',
        '#004355',
        '#005c61',
        '#00735d',
        '#128949',
        '#669b29',
        '#b0a600'
      ],
      borderWidth: 1
    }
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            color: 'rgb(0,0,0)',
            fontColor: 'rgb(0,0,0)'
          },
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            fontColor: 'black'
          }
        },
        x: {
          beginAtZero: true,
          ticks: {
            fontColor: 'black'
          }
        }
      }
    },
  };


  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}


function storeProducts(){
  let stringifiedProducts = JSON.stringify(products);
  localStorage.setItem('products', stringifiedProducts);
}

function getProducts() {
  let potentialProducts = localStorage.getItem('products');
  if (potentialProducts) {
    let parseProducts = JSON.parse(potentialProducts);
    console.log(products);
    products = parseProducts;
    console.log(products);
  }
}


myContainer.addEventListener('click', handleClick);

getProducts();
renderProducts();
