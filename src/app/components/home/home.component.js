import homeView from "./home.component.html";

const divElem = document.createElement("div");
divElem.className = "home-container";

export const homeComponent = {
    view: function(){
        divElem.innerHTML = homeView;
        return divElem;
    }
};
