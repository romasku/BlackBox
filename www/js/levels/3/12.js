function calc(a) {
    var b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    while (a > 0) {
        b[a % 10]++;
        a = parseInt(a / 10);
    }
    var ans = 0;
    for (var i = 0; i < 10; i++) if (b[i] > 0) ans++;
    return ans;
}