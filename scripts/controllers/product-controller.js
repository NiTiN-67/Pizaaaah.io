//Product Controller - It is a glue between view amd model
//controller - i/o view layer
//data exchange b/w view and model
// window.addEventListener(
//     'load', bindevents()
// )

// function bindevents(){
//     document.getElementById('clickme').addEventListener(
//         'click',
//         ()=>{
//           alert("Bill Payed!");
//         }
//     )
// }

import productOperations from "../services/product-operations.js";
async function loadPizzas(){
    const pizzas = await productOperations.loadProducts();
    console.log('Pizzas are = ', pizzas);
    // const rowdiv = document.getElementById('loadData');
    // let pizzalen = pizza.length;
    
    // for (let i = 0; i < pizza.length; i++) {
    //     const col = document.createElement('div');
    //     col.classList.add('col-4');
    //     col.innerHTML = `
    //     <div class="card mt-2">
    //             <img
    //               src="${pizza[i].url}"
    //               class="card-img-top"
    //               alt="..."
    //               width="200px"
    //               height="200px"
    //             />
    //             <div class="card-body">
    //               <h5 class="card-title">${pizza[i].name}</h5>
    //               <p class="card-text">
    //                 ${pizza[i].desc}
    //               </p>
    //               <a href="#" class="btn btn-primary">Add to cart</a>
    //             </div>
    //           </div>`;
    //           rowdiv.appendChild(col);
        
    // }
    // pizza.forEach(i => {
    //     const col = document.createElement('div');
    //     col.classList.add('col-4');
    //     col.innerHTML = `
    //     <div class="card mt-2">
    //             <img
    //               src="${i.url}"
    //               class="card-img-top"
    //               alt="..."
    //               width="200px"
    //               height="200px"
    //             />
    //             <div class="card-body">
    //               <h5 class="card-title">${i.name}</h5>
    //               <p class="card-text">
    //                 ${i.desc}
    //               </p>
    //               <a href="#" class="btn btn-primary">Add to cart</a>
    //             </div>
    //           </div>`;
    //           rowdiv.appendChild(col);
    // });

    for(let pizza of pizzas) {
      preparePizzaCard(pizza);
      console.log(pizza);
    }
};
loadPizzas();

function addpizzaToCart(){
  // const pizzaId = this.getAttribute('product-id');
  // console.log('Current Button Clicked', pizzaId);
  // const pizza = productOperations.searchProducts(pizzaId);
  // console.log('Pizza ', pizza);
  // pizza.isAddedInCart = !pizza.isAddedInCart;

  console.log('Add to cart called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Your Pizza ID is = ', pizzaId);
  const selectedPizza = productOperations.searchProducts(pizzaId);
  console.log('You have selected pizza : ', selectedPizza);
  selectedPizza.isAddedInCart = !selectedPizza.isAddedInCart;
  if(selectedPizza.isAddedInCart){
    this.className = 'btn btn-danger';
    this.innerText = 'Remove from Cart';
    productOperations.addToCart(selectedPizza);
  }
  else{
    this.className = 'btn btn-primary';
    this.innerText = 'Add to Cart';
    productOperations.removeFromCart(selectedPizza);
  }
  printBasket();
}

function printBasket(){
  const cartProducts = productOperations.getProductsInCart();
  // console.log('Products in cart', cartProducts);
  const basket = document.querySelector('#basket');
  basket.innerHTML = '';
  for(let product of cartProducts){
    const li = document.createElement('li');
    const prodcard = document.createElement('div');
    prodcard.className = 'card';
    const cardrow = document.createElement('div');
    cardrow.className = 'row';
    const cardname = document.createElement('div');
    cardname.className = 'col-9';
    cardname.innerText = product.name;
    const cardpric = document.createElement('div');
    cardpric.className = 'col-3';
    cardpric.innerText = product.price;
    cardrow.appendChild(cardname);
    cardrow.appendChild(cardpric);
    prodcard.appendChild(cardrow);
    // li.innerText = `${product.name} ${product.price}`;
    basket.appendChild(prodcard);
    // if(!cartProducts){
    //   basket.innerHTML = `<p class = "text-center text-secondary">Empty Basket</p>`;
    // }
  }
  var count = productOperations.getProductsInCart().length;
// console.log('size is = ', count);
const cartcount = document.querySelector('#count');
cartcount.innerHTML = '';
const number = document.createElement('h6');
number.innerText = `${count}`;
cartcount.appendChild(number);

const SUBTOTAL = document.querySelector('#subtotalbill');
const TOTAL = document.querySelector('#totalbill');
var total = cartProducts.reduce((t,currentprod)=>t+parseFloat(currentprod.price),0);
var totalwithgst = total*1.18;
SUBTOTAL.innerText = total;
TOTAL.innerText = totalwithgst;
}


function preparePizzaCard(pizza){
  const outputDiv = document.querySelector('#output');
  const colDiv = document.createElement('div');
  colDiv.className = 'col-4';
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  // cardDiv.style = "width : 18 rem";
  colDiv.appendChild(cardDiv);
  const img = document.createElement('img');
  img.src = pizza.url;
  img.className = 'card-img-top';
  cardDiv.appendChild(img);
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardDiv.appendChild(cardBody);
  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.innerText = pizza.name;
  const pTag = document.createElement('p');
  pTag.className = 'card-text';
  pTag.innerText = pizza.desc;
  const button = document.createElement('button');
  button.setAttribute('product-id', pizza.id);
  button.addEventListener('click', addpizzaToCart);
  button.className = 'btn btn-primary';
  button.innerText = 'Add to cart';
  cardBody.appendChild(h5);
  cardBody.appendChild(pTag);
  cardBody.appendChild(button);
  outputDiv.appendChild(colDiv);
  return outputDiv;
}
