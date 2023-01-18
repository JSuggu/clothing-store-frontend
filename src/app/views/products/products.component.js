import productsView from "./products.component.html";
import productCardService from "../../utils/product-card.service";
import { forms } from "../../utils/clothe-form.service";
import { urlGroup } from "../../utils/urls.service";

const divElem = document.createElement("div");
divElem.className = "filters-products-container";
const urlDomain = urlGroup.railServer;

export const productsComponent = {
    view: function (){
        divElem.innerHTML = productsView;
        return divElem;
    },

    //Funcion que muestra todos los productos de la base de datos
    loadProducts: async function (){
        const response = await fetch(`${urlDomain}/products`);
        const allProducts = (await response.json()).allProducts;

        const productsElem = divElem.querySelector(".products");

        //Recorro todos los productos de la base de datos, extraigo los datos los meto en una constante y lo añado al html
        allProducts.forEach( clothe => {
            const product = {
                id: clothe.id,
                name: clothe.name,
                price: clothe.price,
                color: clothe.clothes_color == null ? "" : clothe.clothes_color.name,
                type: clothe.clothes_type == null ? "" : clothe.clothes_type.name
            }
            productsElem.appendChild(productCardService(product));
        });

        //calcular altura del contenedor de los productos
        let elems = allProducts.length / 4;
        const elemsRest = allProducts.length % 4;
        if(elemsRest != 0)
            elems += 1;

        divElem.style.height = Math.trunc(elems)*460 + "px";

        return true;
    },

    filterProducts: async function (){
        const filtersAndProducts = divElem.querySelector(".filters-and-products");
        const filters = divElem.querySelector(".filters");

        filters.addEventListener("click", async e => {
            e.stopImmediatePropagation();
            const productsElem = filtersAndProducts.querySelector(".products");

            if(e.target.nodeName.toLowerCase() != "input")
                return false;

            const filterSelected = e.target.className;

            const response = await fetch(`${urlDomain}/products/${filterSelected}`)
            const allProductsFiltered = (await response.json()).allProducts;
            
            filtersAndProducts.removeChild(productsElem);
            const newProductsElem = document.createElement("section");
            newProductsElem.className = "products";
            filtersAndProducts.appendChild(newProductsElem);

            allProductsFiltered.forEach( clothe => {
                const product = {
                    id: clothe.id,
                    name: clothe.name,
                    price: clothe.price,
                    color: clothe.clothes_color == null ? "" : clothe.clothes_color.name,
                    type: clothe.clothes_type == null ? "" : clothe.clothes_type.name
                }
                newProductsElem.appendChild(productCardService(product));
            });
            
            let elems = allProductsFiltered.length / 4;
            const elemsRest = allProductsFiltered.length % 4;
            if(elemsRest != 0)
                elems += 1;

            divElem.style.height = Math.trunc(elems)*460 + "px";
        });

        return true;
    },

    addProducts: function (){
        if(sessionStorage.getItem("user") == null || JSON.parse(sessionStorage.getItem("user")).role == "customer")
            return false;

        //Crea un boton para añadir productos
        const filtersAndProducts = divElem.querySelector(".filters-and-products");
        const addButton = document.createElement("button");
        addButton.className = "add-button";
        addButton.innerText = "Añadir Producto";
        divElem.insertBefore(addButton, filtersAndProducts);

        // cuando se clickea sobre el boton "añadir producto" se carga un formulario
        addButton.addEventListener("click", e => {
            filtersAndProducts.appendChild(forms.addClothe()); 

            const clothesForm = filtersAndProducts.querySelector(".clothes-form-container")
            const closeButton = clothesForm.querySelector(".close-form");

            closeButton.addEventListener("click", e => {
                filtersAndProducts.removeChild(clothesForm);
                return false;
            });

            const form = clothesForm.querySelector(".form-container");
            form.addEventListener("submit", async e => {
                e.preventDefault();
                const data = {
                    name: e.target.name.value,
                    price: e.target.price.value,
                    color: e.target.color.value,
                    type: e.target.type.value
                }

                //obtengo el token que se guarda en el local storage y lo envio para la auntenticacion
                const token = "Bearer " + localStorage.getItem("user"); 
                const response = await fetch(`${urlDomain}/add/product`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);
                window.location.reload();
                return true;
            });
        });

        return true;
    },

    modifyProducts: function(){
        const products = divElem.querySelector(".products");
        const filtersAndProducts = divElem.querySelector(".filters-and-products");

        products.addEventListener("click", e => {
            if(e.target.className == "modify-clothe"){
                const clotheSelected = e.path[1];
                const data = {
                    id: clotheSelected.querySelector("#clothe-id").innerHTML.split(" ")[1],
                    name: clotheSelected.querySelector(".clothe-name").innerHTML,
                    price: clotheSelected.querySelector(".clothe-price").innerHTML.split("$")[1],
                    color: clotheSelected.querySelector(".clothe-color").innerHTML,
                    type: clotheSelected.querySelector(".clothe-type").innerHTML

                }

                filtersAndProducts.appendChild(forms.modifyClothe());
                const clothesForm = filtersAndProducts.querySelector(".clothes-form-container");
                const closeButton = clothesForm.querySelector(".close-form");

                closeButton.addEventListener("click", e => {
                    filtersAndProducts.removeChild(clothesForm);
                    return false;
                });

                const form = clothesForm.querySelector(".form-container");
                const inputsTypeText = form.querySelectorAll("input[type=text]");

                //convierto el json "data" en un array para poder insertar sus valores en los input 
                const dataArray = [];

                for (const [key, value] of Object.entries(data)){
                    dataArray.push(value);
                }

                //recorro los inputs de tipo texto e inserto los valores de data
                let count = 1;
                inputsTypeText.forEach( input => {
                    input.value = dataArray[count];
                    count++;
                })

                form.addEventListener("submit", async e => {
                    e.preventDefault();
                    const dataUpdated = {
                        name: e.target.name.value,
                        price: e.target.price.value,
                        color: e.target.color.value,
                        type: e.target.type.value
                    }

                    const token = "Bearer " + localStorage.getItem("user");
                    const response = await fetch(`${urlDomain}/modify/product/${data.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                        body: JSON.stringify(dataUpdated)
                    });

                    const result = await response.json();
                    alert(result.message);
                    window.location.reload();
                    return true;
                });
            }
        })

    },

    deleteProducts: function(){
        const products = divElem.querySelector(".products");
        const token = "Bearer " + localStorage.getItem("user");
        products.addEventListener("click", async e => {
            if (e.target.className == "delete-clothe"){
                const clotheId = e.path[1].querySelector("#clothe-id").innerHTML.split(" ")[1];
                const answer = prompt("Realmente quiere borrar este elemento? si/no");

                if(answer.toLowerCase() == "si"){
                    const response = await fetch(`${urlDomain}/delete/product/${clotheId}`, {
                        method: "DELETE",
                        headers: {
                            "Authorization": token
                        }
                    })
                    const result = await response.json();
                    alert(result.message);
                    window.location.reload();
                    return true;
                }
                
                if(answer.toLowerCase() == "no"){
                    return false;
                }

                return false;
            }
        });
    }
}