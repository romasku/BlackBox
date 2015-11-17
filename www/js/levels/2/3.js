function calc(a) {
    a = a.toString();
    var ans = '';
    for (var i = a.length - 1; i >= 0; i--) {
        ans += a[i];
    }
    return parseInt(ans);
}