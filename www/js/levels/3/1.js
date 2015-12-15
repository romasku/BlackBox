function calc(a) {
    var b = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];
    var ans = 0;
    for (var i = 0; a > 0; i++) {
        ans += b[a % 10];
        a = parseInt(a / 10);
    }
    return ans;
}