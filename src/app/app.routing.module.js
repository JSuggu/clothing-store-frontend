import { homeComponent } from "./views/home/home.component";
import { loginAndCheckinComponent } from "./views/login-checkin/login-checkin.component";
import { userComponent } from "./views/user/user.component";
import { productsComponent } from "./views/products/products.component";
import { urlGroup } from "./utils/urls.service";

const root = document.querySelector("#root");
if(sessionStorage.getItem("login") == null)
    fetch(`${urlGroup.railServer}/database/backup`);

//Rutas
const router = async function(route) {
    root.innerHTML = "";

    if(route == ""){
        
        root.appendChild(homeComponent.view());
        return true;
    }

    if(route == "#/home"){
        root.appendChild(homeComponent.view());
        return true;
    }

    if(route == "#/products"){
        root.appendChild(productsComponent.view());
        await productsComponent.loadProducts();
        await productsComponent.filterProducts();
        productsComponent.addProducts();
        productsComponent.modifyProducts();
        productsComponent.deleteProducts();
        return true;
    }

    if (route == "#/login-checkin"){
        if(sessionStorage.getItem("login") == "true"){
            root.appendChild(userComponent.view());
            userComponent.loadData();
            userComponent.signOff();
            return true;
        }
        root.appendChild(loginAndCheckinComponent.view());
        loginAndCheckinComponent.checkin();
        loginAndCheckinComponent.login();
        return true;
    }

    return root.innerHTML = "ERROR 404 LA RUTA NO EXISTE";
}

export { router };