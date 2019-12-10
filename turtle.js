turtle = null;
tdir = null;
angle = 0;

function move(n) {
    let pn = p5.Vector.add(turtle,p5.Vector.mult(tdir,n));
    line(turtle.x,turtle.y,pn.x,pn.y);
    turtle = pn;
    doText(`move ${n}`)
}

function turn(g) {
    tdir.rotate(g*PI/180);
    doText(`turn ${Math.floor(g)}`)
}

