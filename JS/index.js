//Contants and variables
let inputDir ={x:0, y:0};
const foodSound=new Audio('foodsound.mp3');
const gameOver=new Audio('gameover.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakeArr=[{x:13, y:15}];
let food={x:6, y:7};

//Game Functions

function main(ctime){                 //Current time
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){          // divided by 1000 as time is milliseconds
        return;
}
lastPaintTime=ctime;
gameEngine();

}
function isCollide(snake){
    //If snake bumps itself
    for (let i =1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){       
            return true;
        }
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<0){
            return true;
        } //bumps into the wall
    

}

function gameEngine(){
    //Part 1 - Updating the Snake array and food
        if(isCollide(snakeArr)){
            gameOver.play();
            inputDir={x:0, y:0};
            alert("Game Over :(  Press any key to play again !");
            snakeArr=[{x:13, y:15}];
            score=0;
        }


        //If the food is eaten, increment the score and regenerate the food
        if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){     
            //Food and head position is same, i.e. food is eaten
            foodSound.play();
            score+=1;
            if(score>hiscoreval){
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+ inputDir.y});
            let a=2;     //not keeping the food on the last x or y but in between
            let b=16;
            food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())} //we need to generate food at random place
        }

        //Moving the snake
        for (let i= snakeArr.length-2; i >=0; i--) {
            snakeArr[i+1]={...snakeArr[i]};      //creating a new obj to update the position of i, i.e. each element of snake
        }
        snakeArr[0].x +=inputDir.x;
        snakeArr[0].y +=inputDir.y;



    //Part 2 - display the snake 
    
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{                             //e=element
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;                   
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');

        }else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);

    });
    //Display food

        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;                   
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);




}





//Game Logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    inputDir={x:0, y:1}                   //Start the game

    switch (e.key) {
        case "ArrowUp":
                 console.log("ArrowUp")
                 inputDir.x=0;
                 inputDir.y=-1;
                break;

        case "ArrowDown":
                console.log("ArrowDown")
                inputDir.x=0;
                 inputDir.y=1;
                break; 
        
        case "ArrowLeft":
                console.log("ArrowLeft")
                inputDir.x=-1;
                 inputDir.y=0;
                break;
        
        case "ArrowRight":
                console.log("ArrowRight")
                inputDir.x=1;
                 inputDir.y=0;
                break;

                default:
                break;
    }


});