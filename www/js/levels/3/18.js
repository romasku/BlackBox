function calc(a) {
    s = a.toString();
    var ans = 1;
    for (var i = 0; i < s.length; i++) {
        if (i % 2 == 0) ans *= (parseInt(s[i]) + 1);
        else ans *= parseInt(s[i]);
    }
    return ans;
}