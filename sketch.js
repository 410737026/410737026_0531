class Bullet{
  constructor(args){
    this.r = args.r || 15 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有參數就已10為主
    this.p = args.p || shipP.copy()//createVector(width/2,height/2)//建立一個向量{x:width/2,y:height/2}
    this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(20)
    this.color = args.color || "red"
   }
   draw(){ //匯出物件程式碼
     push()
      translate(this.p.x,this.p.y)
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
     pop()
   }
   update(){   //計算移動後的位子
    this.p.add(this.v) 
   }
 }
 

//class:類別，粒子
class Obj{ //宣告一個類別，一個圖案
  constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
   //this.p = args.p || {x:random(width),y:random(height)} //描述為該物件的初始位置(x,y) ，||(or)當產生一個物件，有傳給位子參數，則使用該參數，就以日後設定產出
   //this.v = {x:random(-1,1),y:random(-1,1)}//設定一個物件的移動速度 
   this.p = args.p ||createVector(random(width),random(height))
   this.v=createVector(random(-1,1),random(-1,1))
   this.size = random(2,4)  //設定一個物件的放大倍率
   this.color = random(fill_colors)
   this.stroke = random(line_colors)
  }
  draw(){ //畫出單一個物件形狀
    push() //執行push的指令後，依照自己的設定，設定原點(0,0的位置 
     translate(this.p.x,this.p.y)
     scale(this.v.x<0?1:-1,-1)
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(3)//線條粗細
     beginShape()
     for(var k=0;k<points.length;k=k+1){
      // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
      //vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endshape()，會把所有點串接再一起
      curveVertex(points[k][0]*this.size,points[k][1]*this.size)
     }
     endShape()
   pop() //執行pop過後，原點(0,0)回到整個視窗的上角
 }
 update() {
  //this.p.x = this.p.x+this.v.x //x軸目前位置加上x軸的移動速度
  //this.p.y = this.p.y+this.v.y
  this.p.add(this.v)//上面兩行的效果

  //  let mouseV = createVector(mouseX,mouseY)
  //  let delta= mouseV.sub(this.p).limit(this.v.mag()*20)
  //  this.p.add(delta)

   if(this.p.x<=0||this.p.x>=width){
   this.v.x=-this.v.x  
  }
   if(this.p.y<=0||this.p.y>=height){
   this.v.y=-this.v.y
   }
}
isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件範圍內
  let d = dist(x,y,this.p.x,this.p.y) //計算兩個點之間的具距離
  if (d<5*this.size){
   return true  //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回rue的值
  }else{
    return false
  }    
}
}

var monster_colors = "6f1d1b-bb9457-432818-99582a-ffe6a7".split("-").map(a=>"#"+a)

class Monster{ //宣告一個怪物類別，名稱Monster
  constructor(args){ //預設值，基本資料(物件顏色，移動速度，大小，初始顯示位置...)
      this.r = args.r || random(15,60) //(大小差異)設定的怪固的主體， 就傳參數args.r來設定怪物大小，沒傳參數，就已100為主
      this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦抽取顯示的初始位置
      this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的數度，如果沒船args參數，就會利用亂數(-1，1)，抽參數
      this.color = args.color || random(monster_colors) //物件充滿顏色
      this.mode = random(["happy","bad"])
      this.dead = false
      this.timenum = 0 //延長時間讓它顯示死亡畫面
  
  }

  draw(){ //劃出元件
      if(this.dead == false ){

          push() //重新設定圓點位置
              translate(this.p.x,this.p.y) //把原點座標(0，0)座標移到物件中心位置
              fill(this.color)
              noStroke()
              ellipse(0,0,this.r)
              
              if(this.mode=="happy"){
                  fill(255)
                  ellipse(0,0,this.r/2)
                  fill(0)
                  ellipse(0,0,this.r/3)
              }else{
                  fill(255)
                  arc(0,0,this.r/2,this.r/2,0,PI)
                  fill(0)
                  arc(0,0,this.r/3,this.r/3,0,PI)
              }
              stroke(this.color)
              strokeWeight(3)
              noFill()
              //line(this.r/2,0,this.r,0)
              for(var j=0;j<8;j++){
                  rotate(PI/4)
                  beginShape()
                      for(var i=0;i<(this.r/2);i++){
                          vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                      }
                      
                  endShape()
              }
          pop() //恢復到整個視窗的左上角
      }
      else{ //怪物死亡的畫面
          this.timenum=this.timenum+1
          push()
              translate(this.p.x,this.p.y) //把原點座標(0，0)座標移到物件中心位置
              fill(this.color)
              noStroke()
              ellipse(0,0,this.r)
              stroke(255)
              line(-this.r/2,0,this.r/2,0)
              stroke(this.color)
              strokeWeight(4)
              noFill()
          
              for(var i=0;i<(this.r/2);i++){
                  rotate(PI/4)
                  line(this.r/2,0,this.r,0)
              } 
              //vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
          pop()
      
  }
}
  update(){ //計算出移動元件後的位置
      this.p.add(this.v)
      if(this.p.x<=0 || this.p.x>width){ //x軸碰到左邊(<=0)，，或是碰到右邊(>width)
          this.v.x = -this.v.x //把x方向速度改變
       }
       if(this.p.y<=0 || this.p.y>height){ //y軸碰到上邊(<=0)，，或是碰到下邊(>height)
          this.v.y = -this.v.y //把y方向速度改變
       }
     }
  
     isBallInRanger(x,y){ //功能:判斷飛彈的位子是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下物件為中心點)之間的距離，放到d變數內
      if(d<this.r/2) {//d<計算物件大小
        return true //飛彈(x,y)與物件的距離(x,y,this.p.x,this.p.y)小於物件的半徑，代表觸碰了，則傳回true的值(觸碰)
        }else{
          return false //飛彈(x,y)與物件的距離(x,y,this.p.x,this.p.y)小於物件的半徑，代表沒觸碰了，則傳回false的值(誤觸碰)
        }
    }
  
}






// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[15, 10], [10,15], [10, 20],[15,25],[10,30],[5,30],[10,35],[15,40],[20,40],[25,35],[25,30],[20,25],[40,20],[30,10],[15,10],[10,20],[35,20]]
var fill_colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var line_colors = "a7c6da-eefcce-9eb25d-f1db4b-edff71".split("-").map(a=>"#"+a)


var ball //目前要處理的物件，暫時放在ball變數內
var balls=[] //把生的"所有"物件

var bulle
var bullets=[]

var monster
var monsters=[]

var shipP

//function preload(){      //程式碼準備執行之前，比setup更早執行
//elephant_sound = loadSound("sound/elephant.wav")
//bullet_sound = loadSound("sound/Launching wire.wav")

//}


var score = 0

function setup() {
createCanvas(windowWidth, windowHeight);
shipP=createVector(width/2,height/2)  //預設砲台的位置在視窗的中間
for(var i=0;i<20;i=i+1){ //i=0,1,2,3,4,5,6... 
  ball = new Obj({}) //產生一個Obj的class元件
  balls.push(ball) //把ball的物件放到balls陣列內
  } 

for(var i=0;i<20;i=i+1){  
 monster = new Monster({}) 
 monsters.push(monster) 
}
}

function draw() {
background(220);
//for(var j=0;j<balls.length;j=j+1){
// ball=balls[j]
// ball.draw()
// ball.update()
//}
if(keyIsPressed){
 if(key=="ArrowLeft"|| key=="a"){
 shipP.x=shipP.x-10

 }
 if(key=="ArrowRight"|| key=="d"){
 shipP.x=shipP.x+10

 }
 if(key=="ArrowUp"|| key=="w"){
 shipP.y=shipP.y-10

 }
 if(key=="ArrowDown"|| key=="s"){
 shipP.y=shipP.y+10

 }

}

for(let ball of balls)
{
  ball.draw()
  ball.update()
  for(let bullet of bullets){
   if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
   balls.splice(balls.indexOf(ball),1)
   bullets.splice(bullets.indexOf(bullet),1)
   score=score-1
  // elephant_sound.play()
     }  
   }
}

for(let bullet of bullets)
{
  bullet.draw()
  bullet.update()
}
for (let monster of monsters) {
 if(monster.dead==true&&monster.timenum>10){
   monsters.splice(monsters.indexOf(monster),1)
 }

  monster.draw();
  monster.update();
  for (let bullet of bullets) {
    if (monster.isBallInRanger(bullet.p.x, bullet.p.y)) {
      //monsters.splice(monsters.indexOf(monster), 1);  // 从数组中移除被击中的鴨子
      bullets.splice(bullets.indexOf(bullet), 1);
      score = score + 1;
      monster.dead = true
    }
  }
}




textSize(50)
text(score,50,50)
push() //重新規劃原點，在視窗中間
 let dx = mouseX - width/2
 let dy = mouseY - height/2 
 let angle = atan2(dy,dx)
 translate(shipP.x,shipP.y)
 fill("yellow")
 noStroke()
 rotate(angle-300)
 triangle(25,25,-25,25,0,-50) //設定三個點畫成一個三角形
fill("orange")
 ellipse(0,0,30)
pop() //恢復原本設定，原點(0,0)在視窗的左上角
}
function mousePressed(){

bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的bullet class元件
bullets.push(bullet)
//bullet_Sound.play()
}

function keyPressed(){
if(key==" "){ //按下空白建發射飛彈，跟按下滑鼠功能一樣
bullet = new Bullet({}) 
bullets.push(bullet)
//bullet_sound.play()
}
}
