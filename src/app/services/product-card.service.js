//Funcion que recibe la informacion del producto, crea un elemento div e inserta toda la informacion necesario dentro, ya sea para un cliente o un admin.
export default function(info){
    const {id, name, price, color, type} = info; 

    const clotheCard = document.createElement("div");
    clotheCard.className = "clothe";

    const card = `
        <img class = "clothe-image" src="https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_960_720.png" width="100px" height="100px">
        <span class= "clothe-name">${name}</span>
        <span class= "clothe-price">Precio: $${price}</span>
        <span class= "clothe-color" class="${color}"></span>
        <span class= "clothe-type" class="${type}"></span>
    `

    if(sessionStorage.getItem("user") == null || JSON.parse(sessionStorage.getItem("user")).role == "customer"){
        clotheCard.innerHTML = card
        return clotheCard;
    }

    const cardOptions = `
    <button class= "modify-clothe">Modificar</button>
    <button class= "delete-clothe">Borrar</button>
    `
    clotheCard.innerHTML = card + `<span id="clothe-id">Id: ${id}</span>` + cardOptions;
    clotheCard.querySelector(".clothe-color").innerHTML = color;
    clotheCard.querySelector(".clothe-type").innerHTML = type;
    
    return clotheCard;
}