 export class Scorer{
    header;
    scoreText;
    constructor(){
        [this.header, this.scoreText] = getDomElements()
    }

    updateScorer(score) {

            this.scoreText.innerHTML=""

            for(let digit of score.toString().split("")){      
            if(digit=="+"){digit="plus"}
            else if(digit=="."){digit="circle"}
            this.scoreText.innerHTML+=`<i class="fa-solid fa-${digit}"></i>`;
            }
        }

 }

 export function getDomElements(){
    const header = document.getElementById("header");
    const scoreText = document.getElementById("headerScore");
    return [header, scoreText];
 }