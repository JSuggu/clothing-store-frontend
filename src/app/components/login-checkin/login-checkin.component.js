import loginAndCheckinView from "./login-checkin.component.html";

const divElem = document.createElement("div");
divElem.className = "login-checkin-container";

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
            const response = await fetch("http://localhost:3000/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const dataJson = await response.json();
            console.log(dataJson);
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
            const response = await fetch("http://localhost:3000/check-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const dataJson = await response.json();
            console.log(dataJson);
        });
    }
}