function calc(a) {
    var ans = 0;
    while (a > 0)
    {
        if (a % 2 == 1) ans++;
        a = parseInt(a / 2);
    }
    return ans;
}