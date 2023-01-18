import loginAndCheckinView from "./login-checkin.component.html";
import { urlGroup } from "../../utils/urls.service";

const divElem = document.createElement("div");
divElem.className = "login-checkin-container";
const urlDomain = urlGroup.railServer;

export const loginAndCheckinComponent = {
    view: function(){
        divElem.innerHTML = loginAndCheckinView;
        const options = divElem.querySelector(".options");
        const loginForm = divElem.querySelector(".login-form");
        const checkinForm = divElem.querySelector(".checkin-form");

        options.addEventListener("click", e => {
            if(e.target.className == "login-option"){
                checkinForm.style.display = "none";
                loginForm.style.display = "flex";
            } else {
                loginForm.style.display = "none";
                checkinForm.style.display = "flex";
            }
        });

        return divElem;
    },

    login: function(){
        const loginForm = document.querySelector(".login-form");
        loginForm.addEventListener("submit", async e => {
            e.preventDefault();
            const userData = {
                userName: e.target.user.value,
                password: e.target.password.value
            }
            const response = await fetch(`${urlDomain}/log-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if(response.status >= 400){
                const error = await response.json();
                alert(error.message);
                return false;
            }

            const dataJson = await response.json();
            localStorage.setItem("user", dataJson.token);
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("user", JSON.stringify({names: dataJson.user.names, userName: dataJson.user.user_name, email: dataJson.user.email, role:dataJson.user.users_role.name}))
            window.location.reload();
            return true;
        });
    },

    checkin: function(){
        const checkinForm = document.querySelector(".checkin-form");
        checkinForm.addEventListener("submit", async e =>{
            e.preventDefault();
            const userData = {
                names: e.target.names.value,
                userName: e.target.user.value,
                password: e.target.password.value,
                email: e.target.email.value
            }
            const response = await fetch(`${urlDomain}/check-in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if(response.status >= 400){
                const error = await response.json();
                alert(error.message);
                return false;
            }

            const dataJson = await response.json();
            alert(dataJson.message);
            window.location.reload();
            return true;
        });
    }
}