function calc(a) {
    s = a.toString();
    var ans = '';
    for (var i = 0; i < s.length; i++) ans += 9 - parseInt(s[i]);
    return Math.abs(parseInt(ans) - a);
}