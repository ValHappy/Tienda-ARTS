new p5(function (app) {
    
    log = new Logica(app);
    
    app.setup = function() {
        const canva = app.createCanvas(1900, 264*3);
        canva.parent("juego");
        app.frameRate(60);
        app.smooth();
    }
    
    app.draw = function() {
        app.background(255, 240, 231);  
        log.show();    
    }
    
    app.mousePressed = function(){
        log.mPressed();
    }
    
});