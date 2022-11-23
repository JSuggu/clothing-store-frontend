import userView from "./user.component.html";

const divElem = document.createElement("div");
divElem.className = "user-container";

export const userComponent = {
    view: function(){
        divElem.innerHTML = userView;
        return divElem;
    },

    loadData: function(){
        const names = divElem.querySelector(".names");
        const userName = divElem.querySelector(".user");
        const password = divElem.querySelector(".password");
        const email = divElem.querySelector(".email");

        const storageUser = sessionStorage.getItem("user");
        const user = JSON.parse(storageUser);

        names.innerHTML = `Nombres = ${user.names}`;
        userName.innerHTML = `Usuario = ${user.userName}`;
        password.innerHTML = `Password = ********`
        email.innerHTML = `Email = ${user.email}`;

        return true;
    },

    signOff: function(){
        const signOffButton = divElem.querySelector(".sign-off");
        signOffButton.addEventListener("click", e =>{
            e.preventDefault;
            sessionStorage.setItem("login", "false");
            sessionStorage.removeItem("user");
            window.location.reload();
        });

        return true;
    }
}