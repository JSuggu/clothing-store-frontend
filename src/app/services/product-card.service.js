export default function(info){
    const {id, name, price, color, type} = info; 

    const clotheCard = document.createElement("div");
    clotheCard.className = "clothe";

    const card = `
           <img class= "image">
           <span class= "name">${name}</span>
           <span class= "price">${price}</span>
           <span class= "color">${color}</span>
           <span class= "type">${type}</span>
    `

    if(sessionStorage.getItem("user") == null || sessionStorage.getItem("user").user.users_role.name == "customer"){
        clotheCard.innerHTML = card;
        return clotheCard;
    }

    const cardOptions = `
    <button class= "delete-clothe">Borrar</button>
    <button class= "modify-clothe">Modificar</button>
    `
    clotheCard.innerHTML = `<span class="id">${id}</span>` + card + cardOptions;
    return clotheCard;
}