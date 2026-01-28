    const buttons = []
    var pressedButton;
    const header = document.getElementById("header")
    const scorer = document.getElementById("headerScore")

    var count = 0;
    var score = 0;



    function createButton(value){

        if(value<=0){return}
        console.log(`El valor del botón creado es ${value}`);
        

        let x = Math.random()*window.innerWidth
        let y = Math.random()*window.innerHeight
        
        element = document.createElement("button");
        
        const button = {
            element:element,
            value: value,
        }

        //html attributes
        element.setAttribute("class","drag");
        element.setAttribute("id", `${count}`);
        element.setAttribute("onClick",`createButton(${value}); increaseValue(${count},1)`)
        
        element.style.left= x+"px"
        element.style.top= `${y}px`
        //console.log("botón creado en "+ x +"x "+y+"y");
        
        element.addEventListener("mouseenter", (e)=>{
            let index = e.target.attributes.id.value;
            
            console.log(`El valor del botón es ${buttons[index].value}`);

            if(buttons[pressedButton]==buttons[index]||!pressedButton){return}

            //PER BUTTON -> ON MERGE
            
                document.body.removeChild(buttons[pressedButton].element)

                buttons[index].value += buttons[pressedButton].value
                drawValue(index)
                
                buttons[index].element.setAttribute("onClick",`createButton(${buttons[index].value}); increaseValue(${index},${buttons[index].value})`)
            
                
        })
        
        document.body.append(element);
        buttons[count]= button;
        drawValue(count)
        count++;
    }

    function increaseValue(count, incremento){
        buttons[count].value+=incremento
        
        drawValue(count)
    }

    function drawValue(buttonID){
        buttons[buttonID].element.innerHTML="";
        for(digit of buttons[buttonID].value.toString().split("")){ 
                    if(digit=="+"){digit="plus"}
                    else if(digit=="."){digit="circle"}
                    buttons[buttonID].element.innerHTML += `<i class="fa-solid fa-${digit}"></i>`
                }

        if(score<buttons[buttonID].value){
            score=buttons[buttonID].value} 
        actualizeScorer(score)
    }

    //Global events 
        document.addEventListener("mousedown", (e)=>{
            pressedButton = e.target.attributes.id.value

            //  console.log(`El id del botón pulsado es ${pressedButton}`);
        })

        document.addEventListener("mousemove", (e)=>{
            if(!pressedButton){
                return
            }
            buttons[pressedButton].element.style.pointerEvents = "none"

            let mouseX = e.clientX
            let mouseY = e.clientY
            
            let buttonH = buttons[pressedButton].element.clientHeight
            let buttonW = buttons[pressedButton].element.clientWidth
            
            buttons[pressedButton].element.style.left= `${mouseX-buttonW/2}px`
            buttons[pressedButton].element.style.top= `${mouseY-buttonH/2}px`

        })

        document.addEventListener("mouseup", (e)=>{
            if(!pressedButton){
                return
            }
             buttons[pressedButton].element.style.pointerEvents = "auto"

            pressedButton = undefined
        })

        function actualizeScorer(score) {

            scorer.innerHTML=""

            for(digit of score.toString().split("")){      
            if(digit=="+"){digit="plus"}
            else if(digit=="."){digit="circle"}
            scorer.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`;
            //console.log("the score is "+score);
        }
        }

        //initialize game
        actualizeScorer(1)
        createButton(1)