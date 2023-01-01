const clothesFormContainer = document.createElement("div");
clothesFormContainer.className = "clothes-form-container";
const clothesForm = document.createElement("div");
clothesForm.className = "form-container";

const form = `
    <form class="clothe-form">
        <label for="name">Nombre del producto</label>
        <input type="text" name="name" id="clothe-name" required>
        <label for="price">Precio del producto</label>
        <input type="text" name="price" id="clothe-price" required>
        <label for="color">Color del producto</label>
        <input type="text" name="color" id="clothe-color">
        <label for="type">Tipo del producto</label>
        <input type="text" name="type" id="clothe-type">
        <input type="submit" value="Enviar" id="send-form">
    </form>
    <div class="products-data-available">
        <span>Colores y Tipos disponibles</span>
        <span>Colores: Azul, Amarillo y Rojo</span>
        <span>Tipos: Calzado, Pantalon, Remeras/Camisas</span>
    </div>
`

export const forms = {
    addClothe: function(){
        clothesForm.innerHTML = `<span class="close-form">X</span> 
        <h1 class="title-form">Formulario para añadir un producto</h1>` + form;
        clothesFormContainer.appendChild(clothesForm);
        return clothesFormContainer;
    },

    modifyClothe: function(){
        clothesForm.innerHTML = `<span class="close-form">X</span>
        <h1 class="title-form">Formulario para modificar un producto</h1>` + form;
        clothesFormContainer.appendChild(clothesForm);
        return clothesFormContainer;
    }
}