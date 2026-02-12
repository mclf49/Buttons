    const buttons = []
    var pressedButton;
    const header = document.getElementById("header")
    const scorer = document.getElementById("headerScore")
    

    var count = 0;
    var score = 0;
    var objective



    function createButton(value){

        if(value<=0){return}

        element = document.createElement("button");
        const button = {}
        button.id = count
        button.element=element;
        button.value=value;
        button.uses=3;

        //html attributes
        
        element.setAttribute("class","drag");
        element.setAttribute("id", `${count}`);
        element.setAttribute("onClick",`useButton(${count})`)
        
        element.addEventListener("mouseenter", (e)=>{

            let index = e.target.attributes.id.value;
            
            console.log(`El valor del botón es ${buttons[index].value}`);

            if(buttons[pressedButton]==buttons[index]||!pressedButton){return}

            //PER BUTTON -> ON MERGE
            
                document.body.removeChild(buttons[pressedButton].element)

                buttons[index].value += buttons[pressedButton].value
                drawValue(index)
                
                buttons[index].element.setAttribute("onClick",`useButton(${buttons[index].id})`)
                console.log(buttons[index].id);
                
        })
        


        document.body.append(element);

        console.log(header.offsetHeight);
        
        let maxHeight = window.innerHeight-element.offsetHeight-50
        let minHeight = header.offsetHeight+50

        element.style.top = `${Math.random()*(maxHeight-minHeight)+minHeight}px`

        let maxWidth = window.innerWidth-element.offsetWidth-100
        
        element.style.left = `${Math.random()*(maxWidth-50)+50}px`
        
        buttons[count]= button;
        drawValue(count)
        count++;
    }


    //Global events 


        //Mouse behaviour

        //When mouse is clicked

        document.addEventListener("mousedown", (e)=>{
           
            pressedButton = e.target.attributes.id.value

        })

        //When mouse moves

        document.addEventListener("mousemove", (e)=>{
            if(!buttons[pressedButton]){
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

        //When mouse is released

        document.addEventListener("mouseup", (e)=>{
            if(!pressedButton){
                return
            }
             buttons[pressedButton].element.style.pointerEvents = "auto"

            pressedButton = undefined
        })

        //GameManagers

        function drawValue(buttonID){
        buttons[buttonID].element.innerHTML="";
        for(digit of buttons[buttonID].value.toString().split("")){ 
                    if(digit=="+"){digit="plus"}
                    else if(digit=="."){digit="circle"}
                    buttons[buttonID].element.innerHTML += `<i class="fa-solid fa-${digit}"></i>`
                }

        if(score<buttons[buttonID].value){score=buttons[buttonID].value} 
        updateScorer(score)
        }

        function updateScorer(score) {

            scorer.innerHTML=""

            for(digit of score.toString().split("")){      
            if(digit=="+"){digit="plus"}
            else if(digit=="."){digit="circle"}
            scorer.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`
        }
            scorer.innerHTML+=`<i class="fa-solid fa-slash fa-rotate-90 fa-xs"></i>`

            for(digit of objective.toString().split("")){      
            if(digit=="+"){digit="plus"}
            else if(digit=="."){digit="circle"}
            scorer.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`
        }
            if(score==objective){
                alert("GANASTE")
            }
        }

        function useButton(buttonID){
            createButton(buttons[buttonID].value)
            buttons[buttonID].uses--
            if(buttons[buttonID].uses<=0){
                document.body.removeChild(buttons[buttonID].element)
            }
        }

        function setObjective(){
            mult = Math.floor(Math.random()*9999)
            console.log(mult);
            objective= Math.floor(Math.random()*mult)
            console.log(objective);
            
        }

        function initializeGame(){
        setObjective()
        updateScorer(1)
        createButton(1)
        }

        initializeGame()