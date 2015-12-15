function calc(a) {
    var ans = 0;
    var q = Math.sqrt(a);
    for (var i = 2; i <= q; i++) if (a % i == 0) {
        ans += i;
        while (a % i == 0) a = parseInt(a / i);
    }
    if (a > 1) ans += a;
    return ans;
}