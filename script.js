    const buttons = []
    var pressedButton;
    var count = 0;
    function createButton(){

        element = document.createElement("button"),      
        element.style.position = "absolute"
    
        element.setAttribute("class","drag");
        element.setAttribute("id", `${count}`);
        element.setAttribute("onClick","createButton()")
        element.innerText = "1"
        document.body.append(element);
        let x = Math.random()*window.innerWidth
        let y = Math.random()*window.innerHeight
        element.style.left= x+"px"
        element.style.top= y+"px"
        console.log("botón creado en "+ x +"x "+y+"y");
        
        element.addEventListener("mouseenter", (e)=>{
            let index = e.target.attributes.id.value;
            
            if(buttons[pressedButton]==buttons[index]||!pressedButton){return}
            
            if(buttons[pressedButton].value == buttons[index].value){
                document.body.removeChild(buttons[pressedButton].element)
                buttons[index].value += 1
                buttons[index].element.innerText = buttons[index].value
            }
        })
        

        const button = {
            element:element,
            value: 1,
        }
        buttons[count]= button;
        count++;
    }

        document.addEventListener("mousedown", (e)=>{
            pressedButton = e.target.attributes.id.value
            console.log(pressedButton);
        })

        
        document.addEventListener("mousemove", (e)=>{
            if(!pressedButton){
                return
            }
            x = e.clientX
            y = e.clientY
            buttons[pressedButton].element.style.left= x+"px"
            buttons[pressedButton].element.style.top= y+"px"
        })
        document.addEventListener("mouseup", (e)=>{
            if(!pressedButton){
                return
            }
            pressedButton = undefined
        })

        createButton()