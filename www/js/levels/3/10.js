function isPal (a) {
    var b = 0;
    var c = a;
    while (a > 0) {
        b *= 10;
        b += a % 10;
        a = parseInt(a / 10);
    }
    return b == c;
}

function calc(a) {
    var v1,v2;
    for (var i = a;; i--) if (isPal(i)) {
        v1 = i;
        break;
    }
    for (var i = a;; i++) if (isPal(i)) {
        v2 = i;
        break;
    }
    if (a - v1 <= v2 - a) return a - v1;
    return v2 - a;
}