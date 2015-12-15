function calc(a) {
    s = a.toString();
    var ans = '';
    for (var i = 0; i < s.length; i++) ans = ans + (parseInt(s[i]) + ((RAND % 9) + 1)) % 10;
    return parseInt(ans);
}