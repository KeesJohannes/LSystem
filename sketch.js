axiom = "a";
sentence = axiom;

function doText(s) {
    push()
    fill("#000000")
    noStroke();
    rect(10,-295,50,-20)
    fill("#ffffff")
    text(s,10,-300);
    pop();
}

function setup() {
    createCanvas(800,800);
    background(0);
    translate(width*0.5,3*height/4);
//    noLoop()
    frameRate(2);
    angle = PI/3;
    accu = 180*angle/PI;
    turtle = createVector(0,0);
    tdir = createVector(10,0);
    initSystem();
    stroke(255);
    strokeWeight(1);
//    carryOut(axiom,4)
//    carryOutQ(axiom,4);
    cry = carryOutQ(axiom,3)
//    print("res:",res)
}

let cry = null;

function draw() {
    translate(width*0.01,3*height/4);
    stroke(255);
    strokeWeight(1);

    let c = cry.next();
    while (!c.done && "abcdeT".indexOf(c.value)<0) {
        executeItem(c.value);
        c = cry.next();
    }
    if (!c.done) {
        executeItem(c.value);
//        print(c);
    } else {
        noLoop();
    }

}

