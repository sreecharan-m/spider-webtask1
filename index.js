let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let WIDTH=1500;
let HEIGHT=720;
let frames=0;
let add=0;
let toggle=0;

const balls={
  position:[],
  count:0,
  draw(){
          if(state.current == 1 || state.current == 0)
          {
            for(i=0;i<this.position.length;i++)
            {
              let p = this.position[i];
              ctx.beginPath();
              ctx.strokeStyle = "#ff0000";
              ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
              ctx.lineWidth=4;
              ctx.stroke();
              ctx.closePath();
            }
          }

  },
  update(){
          if(state.current == 1)
          {
              if(this.position.length >= 75)
              {
                canvas.style.opacity=1;
                //alert("gameover");
                state.current =3;
              }

              for(let i=0;i<this.position.length;i++)
              {
                let mx=(Math.random() * 1) + -0.5;
                let p=this.position[i];
                p.x += mx;
              }
          }
  }
}


while(balls.position.length <= 40)
            {
              let flag=1;
              let rad=Math.floor((Math.random() * 60) + 35);
              let cordx=Math.floor(Math.random()*(WIDTH - 50));
              let cordy=Math.floor(Math.random()*(HEIGHT - 20));
              
              if(balls.position.length <= 1)
              {
                balls.position.push({
                x:cordx,
                y:cordy,
                r:rad
                 })
                 //continue;
              }
              else
              {
                for(let i=0;i<balls.position.length;i++)
                {
                  let p=balls.position[i];
                  let cordx2=p.x;
                  let cordy2=p.y;
                  let rad2=p.r;
                  let d=Math.sqrt((cordx - cordx2)*(cordx - cordx2) + (cordy - cordy2)*(cordy - cordy2));
                  if(d < rad + rad2 +10)
                  {
                    flag=0;
                    break;
                  }
                }

                if(flag == 1)
                {
                  balls.position.push({
                         x:cordx,
                         y:cordy,
                         r:rad
                      })
                }
              } 
            
             }


function addballs()
{
  var timerid=setInterval(function() {
              
         if(state.current == 1)
            {  
              add++;
              let n=add;
              while(n){
              let flag=1;
              let rad=Math.floor((Math.random() * 60) + 35);
              let cordx=Math.floor(Math.random()*(WIDTH - 50));
              let cordy=Math.floor(Math.random()*(HEIGHT - 20));

              for(let i=0;i<balls.position.length;i++)
                {
                  let p=balls.position[i];
                  let cordx2=p.x;
                  let cordy2=p.y;
                  let rad2=p.r;
                  let d=Math.sqrt((cordx - cordx2)*(cordx - cordx2) + (cordy - cordy2)*(cordy - cordy2));
                  if(d < rad + rad2)
                  {
                    flag=0;
                    break;
                  }
                }

               if(flag == 1)
               {
                  balls.position.push({
                         x:cordx,
                         y:cordy,
                         r:rad
                      });
                  n--;
               }              
            }
          }  
  },3000)
}

const state=
{
  current:0,
  getReady:0,
  game:1,
  paused:2,
  over:3,
}

canvas.addEventListener("click",function(event)
  {
    if(state.current == 1)
    {
    let clickx =event.offsetX;
    let clicky =event.offsetY;
    //let arr=balls.position;
    let i=balls.position.length;
    while(i--)
    {
      let p=balls.position[i];
      let d=Math.sqrt((p.x - clickx)*(p.x - clickx) + (p.y - clicky)*(p.y - clicky));
      if(d <= p.r)
      {
        balls.position.splice(i,1);
        score.value++;
        //console.log(balls.position.length);
        score.best=Math.max(score.value,score.best);
        localStorage.setItem("best",score.best);
      }
    }
    /*ctx.clearRect(0,0,WIDTH,HEIGHT);
    for(let j=0;j<balls.position.length;j++)
    {
          let k = balls.position[j];
          ctx.beginPath();
          ctx.strokeStyle = "#fff";
          ctx.arc(k.x,k.y,k.r,0,2*Math.PI);
          ctx.stroke();
          ctx.closePath();
          console.log("hi");
    }*/
    }
  })


document.addEventListener("keydown",function(event){
  var key=event.keyCode;
  console.log("hi");
  if(key == 32)
  {
    if(toggle == 0)
    {
      state.current = 2;
      paused.draw();
      toggle=1;
    }
    else
    {
      toggle=0;
      state.current=1
    }
  }
})

const score={
  value:0,
  best:parseInt(localStorage.getItem("best")) || 0,
  draw()
  {
    if(state.current == 1)
    {
    ctx.beginPath();
    ctx.lineWidth=1.5;
    ctx.font="80px Arial";
    ctx.fillStyle="#ffffff";
    ctx.fillText(this.value,100,100);
    ctx.strokeText(this.value,100,100);
    ctx.closePath(); 
   }  
  }
}

const paused={

    draw()
    {
        if(state.current == 2)
        {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle="#ff0000";
        ctx.strokeText("Game Paused...spacebar to continue",WIDTH/2,HEIGHT/2);
        }
    }
}



const end={
    
    draw(){
        
        if(state.current==3)
        {
        /*ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle="#ff0000";
        ctx.strokeText("Game is Over...Reload The Page",WIDTH/2,HEIGHT/2);
        ctx.closePath();*/

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "40px Teko";
            ctx.fillText("Game over Reload the Page", WIDTH/2 -200, HEIGHT/2);
            ctx.strokeText("Game over Reload the Page", WIDTH/2 -200, HEIGHT/2);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "30px Teko";
            ctx.fillText("BEST SCORE", 650, 450);
            ctx.strokeText("BEST SCORE", 650, 450);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "30px Teko";
            ctx.fillText(score.best, 800, 450);
            ctx.strokeText(score.best, 800, 450);
            ctx.closePath();

        }
    }
}



function draw()
{
  balls.draw();
  score.draw();
  paused.draw();
  end.draw();
}

function update()
{
   balls.update();
}

function gameLoop()
{
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  update();
  draw();
  frames++;
  //console.log(frames);
  requestAnimationFrame(gameLoop);
}
gameLoop();
//update();
addballs();

function startplay()
{
  state.current=1;
  let rmv=document.getElementById("center");
  center.style.display="none";
  canvas.style.opacity=1;
}