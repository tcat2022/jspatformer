const c = document.getElementById('canvas');
const ctx = c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight

const gravity = 0.5

class Player {
constructor(){
this.position = {
x:0,
y:0
}
this.velocity = {
    x:0,
    y:0
}
this.width = 35
this.height = 35
}
draw() {
    ctx.fillStyle = "aquamarine";
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
}
update() {
    this.draw()
    this.position.y += this.velocity.y
    if(this.position.y + this.height + this.velocity.y <= c.height){
this.velocity.y += gravity
    } 
    else this.velocity.y = 0;
} 
}

let player = new Player()

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,c.width,c.height)
    player.update()
}

addEventListener('keydown', ({keyCode}) => {
    switch(keyCode){
    //left
      case 68:
    x+=12;
      break;
      //right
      case 65:
      x -= 12;
      break;
     //jump
     case 32:
     y -= 32;
     break;
}
})


animate()