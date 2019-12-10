rules = [];

class rule {
    constructor(f,seq) {
        this.f = f;
        this.seq = seq;
    }
}

function initrules() {
    rules.push(new rule("c","c60-Td-TTd+Tc+TTcc+Td-T"))
    rules.push(new rule("d","+Tc-Tdd-TTd-Tc+TTc+Td"));

    rules.push(new rule("a","b80-Ta160+Ta80-Tb"))
    rules.push(new rule("b","bb"))

}