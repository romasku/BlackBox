function calc(a) {
    s = a.toString();
    var ans = 0;
    for (var i = 0; i < s.length; i++) {
        if (i % 2 == 0) ans += parseInt(s[i]);
        else ans -= parseInt(s[i]);
    }
    return Math.abs(ans);
}