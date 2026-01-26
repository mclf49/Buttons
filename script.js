    const buttons = []
    var pressedButton;
    const header = document.getElementById("header")
    const scorer = document.getElementById("headerScore")

    var count = 0;
    var score = 0;



    function createButton(value){

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
        element.setAttribute("onClick",`createButton(${value})`)
        
        element.style.left= x+"px"
        element.style.top= `${y}px`
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
                //<i class="fa fa-number>
                buttons[index].element.innerHTML="";
                for(digit of buttons[index].value.toString().split("")){ 
                    if(digit=="+"){digit="plus"}
                    buttons[index].element.innerHTML += `<i class="fa-solid fa-${digit}"></i>`
                }
                buttons[index].element.setAttribute("onClick",`createButton(${buttons[index].value})`)
            }
        })
        
        for(digit of value.toString().split("")){      
            if(digit=="+"){digit="plus"}
            element.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`;
        }
        
        document.body.append(element);
        buttons[count]= button;
        count++;
    }

    //Global events 
        document.addEventListener("mousedown", (e)=>{
            console.log(e);
            
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

            scorer.innerHTML=""

            for(digit of score.toString().split("")){      
            if(digit=="+"){digit="plus"}
            scorer.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`;
        }

            scorer.innerHTML+=`<i class="fa-solid fa-slash fa-flip-horizontal"></i>
                               <i class="fa-solid fa-1"></i>
                               <i class="fa-solid fa-0"></i>
                               <i class="fa-solid fa-0"></i>
                               <i class="fa-solid fa-0"></i>`;
        }

        //initialize game
        actualizeScorer(1)
        createButton(1)