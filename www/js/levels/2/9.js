function calc(a) {
    var q = parseInt(Math.sqrt(a));
    if (a - Math.pow(q, 2) <= Math.pow(q + 1, 2) - a) return Math.pow(q, 2);
    else return Math.pow(q + 1, 2);
}