const c = document.getElementById('canvas');
const start = document.getElementById('start');
const ctx = c.getContext("2d");
c.width  = 700;
c.height = 600;

const gravity = 1.5
let level = 0
let platfromcount = 4
let min = 50;
let max = 500
let isPositive = true;



class Platform {
    constructor({y,direction}) {
        
        this.position = {
         x:Math.floor(Math.random()* (max - min) + min),
         y:y
        }
        this.velocity = {
            x:0,
            y:0
        }
    this.width = 150;
    this.height = 15;    
    this.direction = direction;
    }
    draw(){
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
    }
}

let platforms = []
function createPlatforms(){
    for (let i = 0; i < platfromcount; i++) {
        let platgap = 600 / platfromcount;
        let y = 50 + i * platgap
        let direction;
        if(isPositive){
         direction = 1;
        }else{
         direction = -1;
        }
isPositive = !isPositive;
        //console.log(isPositive)
        let newPlatform = new Platform({y,direction}) 
       platforms.push(newPlatform)
      // console.log(newPlatform.width)
      // console.log(direction)
      }
}
createPlatforms()

class Player {
    constructor(){
        this.width = 35
        this.height = 35

    this.position = {
    x:platforms[5].position.x + 75 - this.width / 2,
    y:platforms[5].position.y - this.height
    }
    this.velocity = {
        x:0,
        y:0
    }
    }
    draw() {
        ctx.fillStyle = "orangered";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= c.height){
    this.velocity.y += gravity
        }else this.velocity.y = 0
    
    } 
    }
    



let player = new Player()


const keys = {
    right: {
        presssed: false
    },
    left: {
        presssed:false
    }
}

platforms.forEach(platform => {
    platform.update()
})
player.draw()

let onPlatform = false;



function animate(){
    requestAnimationFrame(animate)
//console.log(onPlatform)
    ctx.clearRect(0,0,c.width,c.height)
    let speed = 2.5 + level;
   // console.log(speed)
    platforms.forEach(platform => {
        platform.update()
    })
    player.update()
  

    if(keys.right.presssed){
        player.velocity.x = 5
    }
    else if(keys.left.presssed){
        player.velocity.x = -5
    }
    else player.velocity.x = 0
   
if(player.position.x <= c.width - c.width ){
    player.velocity.y = 3
    player.velocity.x = 0
} if(player.position.x + player.width >= c.width){
player.velocity.y = 3
player.velocity.x = 0
}

platforms.forEach(platform => {
if(platform.position.x + platform.width <= c.width - c.width ){
    platform.position.x = c.width 
    level += .05/ platforms.length
}else if(platform.position.x >= c.width){
    platform.position.x = 0
    level += .05/ platforms.length
}
})


//console.log(speed)

onPlatform = false;

   platforms.forEach(platform => {
    if(player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >= platform.position.y
&& player.position.x + player.width >= platform.position.x && player.position.x
<= platform.position.x + platform.width && player.position.x >= c.width - c.width
&& player.position.x + player.width <= c.width
){ 
    onPlatform = true;
    platform.velocity.x = speed * platform.direction
    player.velocity.x += platform.velocity.x
     player.velocity.y = 0
    }else platform.velocity.x = speed * platform.direction; 
        
})

if(player.position.y + player.height <= 450){
    platforms.forEach(platform => {
        platform.position.y += 4.5
        
    })
}

}


start.addEventListener('click', ()=>{
    start.style.display = 'none'
    animate()
})
animate()


addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
    //left
      case 65:
    keys.left.presssed = true;
      break;
      //right
      case 68:
     keys.right.presssed = true;
      break;
     //jump
     case 32:
       // if(onPlatform){
     player.velocity.y -= 20
        //}
    
     break;
}
})

addEventListener('keyup', ({keyCode}) => {
    switch(keyCode){
    //left
      case 65:
        keys.left.presssed = false;
      break;
      //right
      case 68:
        keys.right.presssed = false;
      break;
     //jump
     case 32:

     break;
}
})
