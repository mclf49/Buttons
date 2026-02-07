export  class Button {

    constructor(value, uses=3) {
        this.id = new Date().getMilliseconds();
        this.DOMelement = buildDomElement(id);
        this.value = value;
        this.uses = uses;
    }

    increaseValue(){
        this.value++;
    }

    decreaseUses(){
        this.uses--;
    }
}

function buildDomElement(id, value) {
    DOMelement = document.createElement("button");
    DOMelement.setAttribute("class", "drag");
    DOMelement.setAttribute("id", `${id}`);


    DOMelement.innerHTML = "";
    for (digit of value.toString().split("")) {
        if (digit == "+") { digit = "plus" }
        else if (digit == ".") { digit = "circle" }
        DOMelement.innerHTML += `<i class="fa-solid fa-${digit}"></i>`
    }

    return DOMelement
}