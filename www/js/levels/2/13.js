function calc(a) {
    a = a.toString();
    var ans = '';
    for (var i = 0; i < a.length; i++) if (a[i] != 6) ans += a[i];
    return ans;
}