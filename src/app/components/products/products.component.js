import productsView from "./products.component.html";
import productCardService from "../../services/product-card.service";

const divElem = document.createElement("div");
divElem.className = "products-container";

export const productsComponent = {
    view: function (){
        divElem.innerHTML = productsView;
        return divElem;
    },

    loadProducts: async function (){
        const response = await fetch("http://localhost:3000/products");
        const productsData = (await response.json()).allProducts;

        const productsElem = divElem.querySelector(".products");

        productsData.forEach( clothe => {
            const product = {
                id: clothe.id,
                name: clothe.name,
                price: clothe.price,
                color: clothe.clothes_color == null ? "" : clothe.clothes_color.name,
                type: clothe.clothes_type == null ? "" : clothe.clothes_type.name
            }
            productsElem.appendChild(productCardService(product));
        });

        return true;
    },

    filterFood: function (){
        
    },

    addFood: function (){

    }
}