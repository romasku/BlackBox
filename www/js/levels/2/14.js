function calc(a) {
    b = parseInt(a);
    var ans = 0;
    var num = 0;
    while (b > 0) {
        ans += b % 10;
        b = parseInt(b / 10);
        num++;
    }
    return parseInt(ans / num);
}