actions = [];
accu = 0;
accuUsed = true;
accuSign = 1;

class action {
    constructor(f,fun) {
        this.f = f;
        this.fun = fun;
    }

    execute(p) {
        this.fun(p);
    }
}

function initactions() {
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

