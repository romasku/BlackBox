function calc(a) {
    var s = a.toString();
    if (s.length == 1) return 0;
    var ans = 0;
    for (var i = 1; i < s.length; i++) {
        ans += parseInt(s[i]) * parseInt(s[i - 1]);
    }
    return ans;
}