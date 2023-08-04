//Contains the logic for Fetching, Adding, Sorting, Searching, Deletion, Updating
import Product from '../models/product.js'
import makeNetworkCall from './api-client.js';

const productOperations = {
    products : [],
    carts : [],
    addToCart(product){
        this.carts.push(product);
    },
    removeFromCart(product){
        this.carts = this.carts.filter(pizza=>pizza.id != product.id);
    },
    searchProducts(pizzaId){
        const product = this.products.find(currentProduct=>currentProduct.id == pizzaId);
        console.log('Product found ', product);
        // product.isAddedInCart = true;
        // console.log(this.products);
        return product;
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product=>product.isAddedInCart);
        return productInBasket;
    },
    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArray =  pizzas['Vegetarian'];
        const productsArray = pizzaArray.map(pizza=>{
            const currentPizza = new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
            return currentPizza;
        });
        console.log('Products Array = ', productsArray);
        this.products=productsArray
        return productsArray;
    },
    sortProducts(){

    },
    // searchProducts(id){
    //     console.log('Pizaaaah',this.pizzas);
    //     //const searchedPizzaArray = pizzzas.vegetarian;
    //     console.log('Search Pizza :::: ', this.pizzas.length, 'Id', id);
    //     const searched = this.pizzas.filter(pizza=>pizza['id'] === id);
    //     return searched;
    // }

}
export default productOperations;