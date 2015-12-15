function calc(a) {
    var c = a;
    var b = [];
    var max = 0;
    for (var i = 0; a > 0; i++) {
        b[i] = a % 10;
        if (b[i] > max) max = b[i];
        a = parseInt(a / 10);
    }
    return c*max;
}