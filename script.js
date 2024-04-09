const c = document.getElementById('canvas');
const ctx = c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight
let x = 0




function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,c.width,c.height)
    ctx.fillStyle = "aquamarine";
    ctx.fillRect(x,280, 100,100);
    x+=2
}

animate()