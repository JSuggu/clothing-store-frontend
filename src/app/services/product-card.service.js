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

    if(sessionStorage.getItem("user") == null || sessionStorage.getItem("user").role == "customer"){
        clotheCard.innerHTML = card;
        return clotheCard;
    }

    const cardOptions = `
    <button class= "modify-clothe">Modificar</button>
    <button class= "delete-clothe">Borrar</button>
    `
    clotheCard.innerHTML = card + `<span id="clothe-id">Id: ${id}</span>` + cardOptions;
    return clotheCard;
}