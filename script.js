const run = document.querySelector(".mainscreen")
const mario = document.querySelector("#mario")
const villain = document.querySelector(".villain1")
const villain2 = document.querySelector(".villain2")
const floor = document.querySelector("#floor")
const background = document.querySelector(".background")
const gamescore = document.querySelector(".score")
let gameover = false
const gameoverdisplay = document.querySelector(".gameoverbox")
const yourscore = document.querySelector(".yourscore")
const playagain = document.querySelector(".playagain")
let gamescoreId = null
const controls = document.querySelector(".controls")

let moving = false;
let speed = 4
let speedf = 2
let intervalId  = null
let movingR = false
let movingL = false
let isjumping = false
let backintervalId = null
let villaininterval = null
const play = document.querySelector(".play")

const audiostarter = document.querySelector(".pregamemp3")
const audioingame = document.querySelector(".ingamesoundmp3")
const snap = document.querySelector(".snapmp3")

window.addEventListener("load",()=>{
    audiostarter.play()
})

villain.style.animation = "none"
villain2.style.animation = "none"
play.addEventListener("click",()=>{
    
    controls.style.display = "none"
audiostarter.pause()


setTimeout(()=>{
    audioingame.play()

},1000)

    play.style.display = "none"
    villain.style.animation = "villainanimation 3s linear infinite"
    villain2.style.animation = "villainanimation2 10s linear 10s infinite"
    
    //right face moving
window.addEventListener("keydown",(e)=>{
    

    if(e.code ==="ArrowRight" && !moving){

        
    mario.src = "mariorun.gif"
    mario.style.width = "35px"
    mario.style.height = "50px"
    moving = true
    mario.style.transform = "scaleX(1)"
   
    
    
    
}
})
//right face stop
window.addEventListener("keyup",(e)=>{
    if(e.code === "ArrowRight" && moving){
        mario.src = "mariostop.png"
        mario.style.width = "25px"
        mario.style.height = "50px"
        moving = false
        mario.style.transform = "scaleX(1)"
      

    }
   

})
//left face moving
window.addEventListener("keydown",(e)=>{
    if(e.code === "ArrowLeft" && !moving){

        mario.src = "mariorun.gif"
        mario.style.width = "35px"
        mario.style.height = "50px"
        moving = true
        mario.style.transform = "scaleX(-1)"
       
}
    }
)
//left face stop
window.addEventListener("keyup",(e)=>{
    if(e.code === "ArrowLeft" && moving){
        mario.src = "mariostop.png"
        mario.style.width = "25px"
        mario.style.height = "50px"
        moving = false
        mario.style.transform = "scaleX(-1)"

      
    }
})
//moving right function
function moveRight(){
    const mover = parseInt(getComputedStyle(mario).left,10) || 0
   if(mover <= 450) 
    mario.style.left = `${mover + speed}px`
}
//event linstener for moving right
window.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowRight" && !intervalId ){
        intervalId = setInterval(moveRight,10)
        movingR = true
        moving = true


    }
})
//event listner to stoping
window.addEventListener("keyup",(e)=>{
if(e.key === "ArrowRight" && intervalId){
    clearInterval(intervalId)
    intervalId = null
    movingR = false
    moving = false
}
})
//left move function
function moveLeft(){
    const mover = parseInt(getComputedStyle(mario).left,10) || 0
    if(mover>= 20){
    mario.style.left = `${mover - speed}px`
    }
}  
//left move event
window.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowLeft" && !intervalId){
        intervalId = setInterval(moveLeft,10)|| 0
        movingL = true
        moving = true
}
})
//left stop event
window.addEventListener("keyup",(e)=>{
if(e.key === "ArrowLeft" && intervalId){
    clearInterval(intervalId)
    intervalId = null
    movingL = false
    moving = false 
}
})
//jumping event
window.addEventListener("keydown",(e)=>{
    if(e.key === " "&& !isjumping){
     isjumping = true;
     mario.style.animation = "none"
     mario.offsetHeight;
     mario.style.animation = "jumping 0.5s ease-out forwards"
     setTimeout(()=>{
        isjumping = false
     },500)
     
    }
})
//moving mario with floor function
function movebackward(){
    const moveb = parseInt(getComputedStyle(mario).left,10) || 0
   if(movingR){ 
    mario.style.left = `${moveb - speedf}px`
   }
   else if(movingL && moveb >= 10){
    mario.style.left = `${moveb - speedf}px`
   }
   else if(!moving&& moveb >=10){
    mario.style.left = `${moveb - speed}px`
   }

}
//directly use backward with movebackward function
function backward(){
    if(!movingR&&!backintervalId){
        backintervalId  = setInterval(movebackward,10)
        
    }
}
if(!movingR){
    backward()
}
function checkCollision(){
    const mariox = mario.getBoundingClientRect();
    const villainx = villain.getBoundingClientRect();
    const villainx2 = villain2.getBoundingClientRect()
    if(mariox.left<villainx.right&&
        mariox.right>villainx.left&&
        mariox.bottom > villainx.top &&   
        mariox.top < villainx.bottom ||
        mariox.left<villainx2.right&&
        mariox.right>villainx2.left&&
        mariox.bottom > villainx2.top &&   
        mariox.top < villainx2.bottom
    ){
        
            gameoverdisplay.style.display = "flex"
            
            audioingame.pause()
            snap.play()
            

            
               gameover = true ;
        
        stopGame()

    }
    
}
setInterval(checkCollision,100)



  

function stopGame() {
    
    if(gameover){clearInterval(intervalId);  // Stop movement
    clearInterval(backintervalId);  // Stop background movement
    mario.src = 'mariostop.png';  // Show Mario in the stopped position
    // You can add more actions here, like showing a "Game Over" message
    floor.style.animation = "none"
    background.style.animation = "none"
    villain.style.animation = "none"
    villain2.style.animation = "none"
clearInterval(gamescoreId)
playagain.style.display = "flex"

gameover = false;
}
    
  }
  let x = 0
  function gamescorefn(){
    if(!gameover){
   gamescoreId = setInterval(scoreinc,1000)
function scoreinc(){
    x += 1
gamescore.innerHTML = `Score:${x}`
yourscore.innerHTML = (`Your Score: ${x}`)
}

    }
  }
  gamescorefn()}
)

