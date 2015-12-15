function calc(a) {
    var b = [];
    var max = 0;
    var min = 9;
    for (var i = 0; a > 0; i++) {
        b[i] = a % 10;
        if (b[i] > max) max = b[i];
        if (b[i] < min) min = b[i];
        a = parseInt(a / 10);
    }
    return max-min;
}