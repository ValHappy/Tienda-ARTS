class Logica {
    
    constructor(app) {
        this.app = app;
        this.counter = 0;  //keeps track of units of time
        this.flash = 0;  //transparency of elements in the start screen
        this.FL = 10;      //speed at which the elements in the start screen fade in/out
        
        this.hoverX = window.innerWidth / 2; //Describes initial x position of Blob
        this.hoverY = 264 * 3; //Describes initial y position of Blob
        
        this.mousePosY;  //Controls the fill color of the background according to mouseY
        
        this.iGoTop = false;   //When the mouse enters the active area for Blob to appear 
        this.FLiApproachTop; //When the mouse approaches active area for Blob to appear
        this.beenclicked = false;   //When the user hasn't clicked on the active area
        this.isMovingUp = false; //The character is physically moving upwards
        this.isCalled = false;   //When character is called 'meet' the mouse (ie mouse clicked)
        
        this.charaX;
        this.charaY;
        this.charaJx;   //Describes position of Blob after he is called
        
        this.vivo = true;
        this.r = 0; //determines RED colour values of Blob
        this.g = 0; //determines GREEN colour values of Blob
        this.mx = 0; // for googly eyes
        this.contador = 0;
        this.s = null;
        
        this.timeModal = 8;
        
        this.salto = true;
        this.mover = false;
        this.velY = -10;
        this.velX = 10;
        this.saltoBloop = this.saltoBloop.bind(this);
        this.iden = setInterval(this.saltoBloop, 2000);
        this.detener = this.detener.bind(this);
        setTimeout(this.detener, 10000)
    }
    
    show() {
        //Pseudo timer
        this.counter = this.counter + 1;
        
        
        if (this.s != null) {
            this.s.display();
        }
        
        if (this.contador >= 3  && this.vivo == true) {
            console.log("Si");
            this.vivo = false;
            
            //intento
            var modalWin = document.querySelector(".modal2");
            var contenidoModal = document.querySelector(".modal-contenido2");
            var cerrarModal = document.querySelector(".cerrar2");

            if (this.vivo == false) {
                //TweenMax.to(contenidoModal, 2, {opacity: 1});
                TweenMax.to(modalWin, 2, {display: "block", opacity: 1});
            }
            
            // inicia confeti -------------------------------
            TweenMax.set("img",{xPercent:"-50%",yPercent:"-50%"})
            var total = 100;
            var wdt = $(window).width();
            var hgt = $(window).height();
            var w = wdt*0.45;
            var h = hgt*0.5;
            
            for (var i=0; i<total; i++){ 
                $(".modal-contenido__info2").append('<div class="dot"></div>')
                TweenMax.set($(".dot")[i],{x:Random(w),y:random(-100,100) ,opacity:1,scale:Random(0.5)+0.5,backgroundColor:"hsl(" + random(170,360) + ",60%,60%)"});
                animm($(".dot")[i]);
            }
            
            function animm(elm){   
                TweenMax.to(elm,Random(5)+4,{y:h,ease:Linear.easeNone,repeat:-1, delay:-5});
                TweenMax.to(elm,Random(5)+1,{x:'+=70', repeat:-1,yoyo:true,ease:Sine.easeInOut})
                TweenMax.to(elm,Random(5)+1,{scaleX:0.2,rotation:Random(360), repeat:-1,yoyo:true,ease:Sine.easeInOut})
                TweenMax.to(elm,Random(1)+0.5,{opacity:0, repeat:-1,yoyo:true,ease:Sine.easeInOut})
            };
            
            function Random (max) {
                return Math.random()*max;
            }
            
            function random(min, max) {
                return min + Math.floor( Math.random() * (max - min));
            }
            //Aqui finaliza
            
            
        }
        if (this.vivo == false && this.s == null) {
            let x = this.hoverX;
            let y = this.hoverY;
            this.s = new Splash(this.app,x,y);
        }
        
        
        //---------STAGE ONE: ENTICEMENT----------//
        
        this.iApproachTop = (this.counter > 152) && (this.app.mouseX >= 0) && (this.app.mouseY <= 264 * 3); //I'm navigating in the screen space. counter > 152 to allow the text time to fade out, and delays start of 'program'
        this.iGoTop = (this.counter > 152) && (this.app.mouseX >= 0) && (this.app.mouseY <= 400); //I'm entering the active area
        
        
        //Change gradient of bg, warmer colors indicate where interactivity can occur
        
        
        //Luring Blob out
        if (this.iGoTop == true && this.beenclicked == false) {    // I hover over the active area but do not click
            if (this.correr == false) {
                this.hoverX = this.app.lerp(this.hoverX, this.app.mouseX, 0.02);
                this.hoverY = this.app.lerp(this.hoverY, 570, 0.02); //Blob's shy so he won't go higher than y=570
            }
            this.app.translate(this.hoverX, this.hoverY);
            
            this.r = 90; //Give Blob a constant color
            this.g = 100;
            this.drawCharacter();
        } else if (this.iGoTop == false && this.beenclicked == false) {   //I leave the active area without clicking (aw okay)
            //just testing i've written the program right
            if (this.correr == false) {
                this.hoverX = this.app.lerp(this.hoverX, this.app.mouseX - 50, 0.02); //I've subtracted the extra 50 to emphasise the movement
                this.hoverY = this.app.lerp(this.hoverY, 770, 0.04);
            }
            this.app.translate(this.hoverX, this.hoverY);
            
            this.r = 90; //Give Blob a constant color
            this.g = 100;
            this.drawCharacter();
        }
        
        
        //Luring Blob out, but the user is too fascinated with the Blob appearing then hiding
        if (this.counter > 1000 && this.beenclicked == false && this.iGoTop == true || this.counter > 1000 && this.beenclicked == false && this.iGoTop == false) { //After 1000 units of time, and the user doesn't click in the active area
        this.t = this.t - this.s; //Changes the color values of the top bar blush (createImage)
    } else if (this.counter > 1000 && this.beenclicked == true && this.iGoTop == true) {
        this.t = 63;
        this.counter = 152; //Restarts the counter and color
    }
    
    if (this.t >= 63 || this.t <= 0) { //Ensures rebound of color
        this.s = this.s * -1;
    }
    
    
    //---------STAGE TWO: GRATIFICATION----------// 
    
    //The user beckons Blob by clicking the mouse
    if (this.salto) {
        if (this.iGoTop && this.isMovingUp) {    //I am in the active area and I click the active area (yay!)
            this.beenclicked = true;
            this.iGoTop = false;
            this.isCalled = true;
            this.isMovingUp = true;
        } else if (!this.iGoTop) {  // I am not in the active area and I click the mouse (nay.)
            this.beenclicked = false;
            this.iGoTop = true;
            this.isCalled = false;
            this.isMovingUp = false;
        }
    }
    
    
    //Blob moves out of his hiding spot
    if (this.isCalled) this.animateChara(); //Blob goes to meet me, so Blob will be animated.
    
    
    //---------STAGE END: START OVER----------//
    //This is meant to ensure that you don't call Blob again until he's at the bottom again (so for more breathing room between clicks)
    if (this.charaY <= 250) {
        this.isMovingUp = false;
    }
    
    //Once Blob is out of the screen, we can start the replay sequence
    if (this.charaY <= -250) {
        this.startReplay();
    }
    
}

saltoBloop() {
    if (!this.isCalled && this.iGoTop) {
        this.startYay();
        this.charaJx = this.app.random(0, window.innerWidth);
    }
}


detener() {
    clearInterval(this.iden);
    this.salto = false;
    this.correr = true;
    console.log("entro");
}

startYay() {
    /*file.play();*/
    /*cheer.trigger();  //"Yay!"*/
    this.isCalled = true;
    this.charaX = this.hoverX; //transferring Blob's location attributes to the animation variables
    this.charaY = this.hoverY;
    this.hoverY = 780; // After Blob moves to the top of the screen and restarts the program, you are technically still in the active area so Blob will pop to the top. Altering the variable allows for the this.app.lerp ease-in to do its job
}

animateChara() {
    this.isMovingUp = true;
    this.app.push();
    //---------BLOB'S MOVEMENT----------//
    if (this.salto == true) {
        
        this.charaX = this.charaJx;/*this.app.lerp(this.charaX, this.app.mouseX, 0.1)*/; //How to lock the x-pos at where it was clicked tho? Something I couldn't figure out
        this.charaY = this.app.lerp(this.charaY, -300, 0.07);
        
    }
    if (this.correr == true && this.vivo) {
        this.hoverX += this.velX;
        this.hoverY += this.velY;
        if (this.hoverX >= window.innerWidth || this.hoverX <= 0) {
            this.velX *= -1;
        }
        if (this.hoverY >= 264 * 3 || this.hoverY <= 0) {
            this.velY *= -1;
        }
    }
    this.app.translate(this.charaX, this.charaY);
    this.mx = this.app.lerp(this.mx, 0, 1); //It's not very noticable due to the speed at which Blob moves, but I tried to make the pupils return to the center. Didn't seem to work
    
    //---------BLOB'S COLOUR ANIMATION----------//
    this.r = this.r + 10;
    this.g = this.app.lerp(this.g, 75, 0.2);
    this.drawCharacter();
    this.app.pop();
}

startReplay() {
    this.charaY = this.hoverY + 150; //this tells Blob to go back out of the screen + extra delay
    this.beenclicked = false;
    this.iGoTop = true;
    this.isMovingUp = false;
    this.isCalled = false;   //isCalled becomes false, however when it is false, startYay will be activated, which returns it to it being 'true'. thus creating a loop
}

drawCharacter() {
    
    if (this.vivo == true) {
        //---------Blob's BODY----------//  
        this.app.push();
        this.app.translate(0, 0);
        if (this.app.frameCount % 60 == 0) {
            this.r=     this.app.random(0,255);
            this.g= this.app.random(0,255);
        }
        this.app.stroke(this.r, this.g, 162); // 90, 100,160  are original color settings before Blob turns pink with excitement
        this.app.strokeCap(this.app.ROUND);
        this.app.strokeWeight(100);
        this.app.line(0, 0, 0, 100);
        this.app.pop();
        
        //---------Blob's EYES----------//
        
        this.app.push();
        this.app.noStroke();
        this.app.translate(-34, -5);
        this.app.fill(255);
        this.app.ellipse(0, 0, 25, 25); //whites left
        
        this.app.translate(70, 0);
        this.app.fill(255);
        this.app.ellipse(0, 0, 25, 25); //whites right
        this.app.pop();
        
        //---------Blob's PUPILS----------//
        this.app.push();
        this.app.noStroke();
        this.app.fill(0);
        this.mx = this.app.lerp(this.mx, (this.app.mouseX - this.hoverX) - 35, 0.01); // for some reason they have a tendency to roll to the right after following mouseX, so subtracting the extra helps them return 'look up'
        this.mx = this.app.constrain(this.mx, -39, -26);
        this.app.translate(this.mx, -6);  //allows pupils to follow the mouse
        this.app.ellipse(0, -7, 8, 8); //pupil left
        this.app.ellipse(68, -7, 8, 8); //pupil right
        this.app.pop();
        
        //---------Blob's MOUTH----------// 
        this.app.push();
        this.app.translate(0, 50);
        this.app.rectMode(this.app.CENTER);
        this.app.fill(0);
        this.app.rect(0, 0, 60, 60);
        this.app.stroke(0);
        this.app.strokeWeight(60);
        this.app.line(0, 0, 0, 40);
        this.app.pop();
    }
}

mPressed(){
    if (this.app.dist(this.hoverX,this.hoverY,this.app.mouseX,this.app.mouseY) < 40) {
        console.log("true");
        console.log(this.contador);
        this.contador ++;
    }
}
}


