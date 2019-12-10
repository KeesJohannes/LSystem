
function initSystem() {
    initrules();
    initactions();
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
