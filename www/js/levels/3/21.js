function calc(a) {
    s = a.toString();
    var ans = 0;
    for (var i = 0; i < s.length; i++) {
        if (parseInt(s[i]) % 2 == 0) ans++;
    }
    return ans * a;
}