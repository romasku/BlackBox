function calc(a) {
    if (a == 0) return 1;
    var ans = 0;
    while (a > 0) {
        ans += 1;
        a = parseInt(a / 10);
    }
    return ans;
}
