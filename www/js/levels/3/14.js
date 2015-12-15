function calc(a) {
    if (a == 0) return 0;
    if (a % 365 == 0) a = 365;
    else if (a > 365) a = a % 365;
    var b = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var m = 0;
    for (var i = 0; i < 12; i++) {
        if (m + b[i] >= a) return i + 1;
        m += b[i];
    }
}