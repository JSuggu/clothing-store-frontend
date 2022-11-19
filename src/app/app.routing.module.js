import { homeComponent } from "./components/home/home.component";
import { loginAndCheckinComponent } from "./components/login-checkin/login-checkin.component";
import { userComponent } from "./components/user/user.component";

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

    if (route == "#/login-checkin"){
        if(sessionStorage.getItem("login") == "true"){
            root.appendChild(userComponent.view());
            userComponent.loadData();
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