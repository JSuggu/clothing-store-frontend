import { loginAndCheckinComponent } from "./components/login-checkin/login-checkin.component";
import { homeComponent } from "./components/home/home.component";

const root = document.querySelector("#root");

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

    }

    if(route == "#/user"){
        root.appendChild(loginAndCheckinComponent.view());
        loginAndCheckinComponent.checkin();
        loginAndCheckinComponent.login();
        return true;
    }

    return root.innerHTML = "ERROR 404 LA RUTA NO EXISTE";
}

export { router };