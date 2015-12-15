function fact (a) {
    if (a == 0) return 0;
    var ans = 1;
    for (var i = 2; i <= a; i++) ans *= i;
    return ans;
}

function calc(a) {
    var b = [];
    for (var i = 0; a > 0; i++) {
        b[i] = a % 10;
        a = parseInt(a / 10);
    }
    var ans = 0;
    for (var i = 0; i < b.length; i++) ans += fact(b[i]);
    return ans;
}