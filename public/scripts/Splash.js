class Splash{
  constructor(app, x,y) {
    this.app=app;
    this.col = this.getColor();  // Use color variable 'c' as fill color
    this.x = x;
    this.y = y; // Don't draw a stroke around shapes
    this.sizeI = 200,
    this.offsetX = [],
    this.offsetY = [],
    this.newSize= [];
    this.plusOrMinus;
    
     for(var i = 0; i < 10; i++){
      this.plusOrMinus = ( Math.random() < 0.5 ? -1 : 1);
         this.offsetX.push((this.app.random(this.sizeI)) * this.plusOrMinus);
      this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
         this.offsetY.push((this.app.random(this.sizeI)) * this.plusOrMinus);
         this.newSize.push(this.app.random(this.sizeI)/2);
      //console.log(floor(randomGaussian(0, 15)));
    }
  }
  
  
  display() {
    this.app.fill(this.col);
    this.app.noStroke();
    this.app.ellipse(this.x, this.y, this.sizeI, this.sizeI);
    this.app.ellipse(this.x+this.offsetX[0], this.y+this.offsetY[0], this.newSize[0], this.newSize[0]);
    this.app.ellipse(this.x+this.offsetX[1], this.y+this.offsetY[1], this.newSize[1], this.newSize[1]);
    this.app.ellipse(this.x+this.offsetX[2], this.y+this.offsetY[2], this.newSize[2], this.newSize[2]);
    this.app.ellipse(this.x+this.offsetX[3], this.y+this.offsetY[3], this.newSize[3], this.newSize[3]);
    this.app.ellipse(this.x+this.offsetX[4], this.y+this.offsetY[4], this.newSize[4], this.newSize[4]);
    this.app.ellipse(this.x+this.offsetX[5], this.y+this.offsetY[5], this.newSize[5], this.newSize[5]);
    this.app.ellipse(this.x+this.offsetX[6], this.y+this.offsetY[6], this.newSize[6], this.newSize[6]);
    this.app.ellipse(this.x+this.offsetX[7], this.y+this.offsetY[7], this.newSize[7], this.newSize[7]);
    this.app.ellipse(this.x+this.offsetX[8], this.y+this.offsetY[8], this.newSize[8], this.newSize[8]);
    this.app.ellipse(this.x+this.offsetX[9], this.y+this.offsetY[9], this.newSize[9], this.newSize[9]);
    this.app.ellipse(this.x+this.offsetX[10], this.y+this.offsetY[10], this.newSize[10], this.newSize[10]);
  }
  
  getColor(){
    var rRed = Math.floor((Math.random() * 255) + 1), 
    rBlue = Math.floor((Math.random() * 255) + 1), 
    rGreen = Math.floor((Math.random() * 255) + 1);
    return this.app.color(rRed, rBlue, rGreen);
    
  }
}