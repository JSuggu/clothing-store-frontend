import productsView from "./products.component.html";
import productCardService from "../../services/product-card.service";
import { forms } from "../../services/clothe-form.service";

const divElem = document.createElement("div");
divElem.className = "filters-products-container";

export const productsComponent = {
    view: function (){
        divElem.innerHTML = productsView;
        return divElem;
    },

    //Funcion que muestra todos los productos de la base de datos
    loadProducts: async function (){
        const response = await fetch("http://localhost:3000/products");
        const productsData = (await response.json()).allProducts;

        const productsElem = divElem.querySelector(".products");

        //Recorro todos los productos de la base de datos, extraigo los datos los meto en una constante y lo añado al html
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

        //calcular altura del contenedor de los productos
        let elems = productsData.length / 4;
        const elemsRest = productsData.length % 4;
        if(elemsRest != 0)
            elems += 1;

        divElem.style.height = Math.trunc(elems)*460 + "px";

        return true;
    },

    filterClothe: function (){

    },

    addClothe: function (){
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
                const response = await fetch("http://localhost:3000/add/product", {
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

    modifyClothe: function(){
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
                    const response = await fetch(`http://localhost:3000/modify/product/${data.id}`, {
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

    deleteClothe: function(){
        const products = divElem.querySelector(".products");
        const token = "Bearer " + localStorage.getItem("user");
        products.addEventListener("click", async e => {
            const clotheId = e.path[1].querySelector("#clothe-id").innerHTML.split(" ")[1];
            if (e.target.className == "delete-clothe"){
                const answer = prompt("Realmente quiere borrar este elemento? si/no");

                if(answer.toLowerCase() == "si"){
                    const response = await fetch(`http://localhost:3000/delete/product/${clotheId}`, {
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