function calc(a) {
    a = a.toString();
    var ans = '';
    for (var i = 0; i < a.length; i++) ans += 9 - parseInt(a[i]);
    return parseInt(ans);
}