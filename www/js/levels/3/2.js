function calc(a) {
    var b = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
    var ans = 0;
    for (var i = 0; a > 0; i++) {
        ans += b[a % 10];
        a = parseInt(a / 10);
    }
    return ans;
}