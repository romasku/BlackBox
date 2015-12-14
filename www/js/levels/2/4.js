function calc(a) {
    a = a.toString();
    var ans = '';
    for (var i = a.length - 1; i >= 0; i--) {
        ans += a[i];
    }
    if (ans >= a) return parseInt(ans-a);
    else return parseInt(a-ans);
}
