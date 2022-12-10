import { homeComponent } from "./components/home/home.component";
import { loginAndCheckinComponent } from "./components/login-checkin/login-checkin.component";
import { userComponent } from "./components/user/user.component";
import { productsComponent } from "./components/products/products.component";

const root = document.querySelector("#root");

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
        productsComponent.loadProducts();
        productsComponent.filterClothe();
        productsComponent.addClothe();
        productsComponent.modifyClothe();
        productsComponent.deleteClothe();
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