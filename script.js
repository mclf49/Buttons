    const buttons = []
    var pressedButton;
    const header = document.getElementById("header")
    const scorer = document.getElementById("headerScore")

    var count = 0;
    var score = 0;



    function createButton(){
        let x = Math.random()*window.innerWidth
        let y = Math.random()*window.innerHeight

        element = document.createElement("button"),      
    
        //html attributes
        element.setAttribute("class","drag");
        element.setAttribute("id", `${count}`);
        element.setAttribute("onClick","createButton()")
        
        document.body.append(element);
        element.style.left= x+"px"
        element.style.top= y+"px"
        console.log("botón creado en "+ x +"x "+y+"y");
        
        element.addEventListener("mouseenter", (e)=>{
            let index = e.target.attributes.id.value;
            
            if(buttons[pressedButton]==buttons[index]||!pressedButton){return}

            //PER BUTTON -> ON MERGE
            if(buttons[pressedButton].value == buttons[index].value){


                document.body.removeChild(buttons[pressedButton].element)

                if(score<buttons[index].value){
                    console.log("the score is "+score);
                     score=buttons[index].value}
                actualizeScorer(score+1)
                buttons[index].value += 1
                buttons[index].element.innerText = buttons[index].value
            }
        })
        
        let value = 0
        element.innerText=value
        const button = {
            element:element,
            value: value,
        }

        buttons[count]= button;
        count++;
    }

    //Global events 
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

        function actualizeScorer(score) {
            scorer.innerText=score + " / 1000";
        }
        //initialize game
        actualizeScorer(0)
        createButton()