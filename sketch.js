axiom = "a";
rules = [];
actions = [];
sentence = axiom;
turtle = null;
tdir = null;
angle = 0;
accu = 0;
accuUsed = true;
accuSign = 1;

class rule {
    constructor(f,seq) {
        this.f = f;
        this.seq = seq;
    }
}


class action {
    constructor(f,fun) {
        this.f = f;
        this.fun = fun;
    }

    execute(p) {
        this.fun(p);
    }
}

function move(n) {
    let pn = p5.Vector.add(turtle,p5.Vector.mult(tdir,n));
    line(turtle.x,turtle.y,pn.x,pn.y);
    turtle = pn;
    doText(`move ${n}`)
}

function doText(s) {
    push()
    fill("#000000")
    noStroke();
    rect(10,-295,50,-20)
    fill("#ffffff")
    text(s,10,-300);
    pop();
}

function turn(g) {
    tdir.rotate(g*PI/180);
    doText(`turn ${Math.floor(g)}`)
}

function toAccu(a) {
    if (accuUsed) {
        accu = 0;
        accuUsed = false;
    }
    accu = accu*10+a;
}

function prnt(g) {
    print("a",accu,accuUsed,g);
}

function initSystem() {
    rules.push(new rule("c","c60-Td-TTd+Tc+TTcc+Td-T"))
    rules.push(new rule("d","+Tc-Tdd-TTd-Tc+TTc+Td"));

    rules.push(new rule("a","b80-Ta160+Ta80-Tb"))
    rules.push(new rule("b","bb"))

    actions.push(new action("-",()=>accuSign = -1))
    actions.push(new action("+",()=>accuSign = 1))
    actions.push(new action("a",()=>move(4)))
    actions.push(new action("b",()=>move(4)))
    actions.push(new action("c",()=>move(1)))
    actions.push(new action("d",()=>move(1)))
    actions.push(new action("T",(a)=>{turn(a);accuUsed = true;}));
    for (let i=0;i<10;i++) {
        actions.push(new action(`${i}`,()=>toAccu(i)))
    }
    actions.push(new action("P",prnt));
}

function nextStep(s) {
    let sn = "";
    for (let i=0;i<s.length;i++) {
        let c = s[i];
        let ind = rules.findIndex(r=>r.f==c);
        if (ind>=0) {
            sn += rules[ind].seq
        } else {
            sn += c;
        }
    }
    return sn;
}

function executeItem(c) {
    ind = actions.findIndex(a=>a.f==c);
    if (ind>=0) {
        actions[ind].execute(accu*accuSign);
    }
}

function carryOut(s,level) {
    if (level>0) {
        [...s].forEach(c=>{
            let ind = rules.findIndex(r=>r.f==c);
            if (ind>=0) {
                carryOut(rules[ind].seq,level-1);
            } else {
                executeItem(c);
            }
        });
    } else {
        [...s].forEach(c=>executeItem(c));
    }
}

function* carryOutQ(s,level) {
    let maxlen = 1;
    let ql = [[...s]];
    count = 10000;
    maxlen = s.length;
    while (ql.length>0 && count>0) {
        maxlen = max(maxlen,ql.reduce((a,b)=>max(a,b.length),0));
        let q = ql.pop();
        if (q.length>0) {
            let c = q.shift();
            ql.push(q);
            count--
            if (level>=ql.length) {
                let ind = rules.findIndex(r=>r.f==c);
                if (ind>=0) {
                    ql.push([...rules[ind].seq])
                } else {
//                    executeItem(c);
                    yield c;
                }
            } else {
//                executeItem(c);
                yield c;
            }
        }
    }
    print("qlc",maxlen)
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

