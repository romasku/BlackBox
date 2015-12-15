function calc(a) {
    var b = [];
    var s = a.toString();
    var min = 9;
    for (var i = 0; a > 0; i++) {
        b[i] = a % 10;
        if (b[i] < min) min = b[i];
        a = parseInt(a / 10);
    }
    var ans = '';
    for (var i = 0; i < s.length; i++) {
        ans += parseInt(s[i]) - min;
    }
    return parseInt(ans);
}