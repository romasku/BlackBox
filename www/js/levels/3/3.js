function calc(a) {
    var ans = 0;
    while (a > 0) {
        ans += a % 10;
        a = parseInt(a / 10);
    }
    return ans + ((RAND % 40) + 1);
}