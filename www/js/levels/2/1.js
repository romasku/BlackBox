function calc(a) {
    a = a.toString();
    if (a.length == 1) return a;
    var ans = "";
    ans = a[a.length - 1];
    ans += a.substr(1, a.length - 2);
    ans += a[0];
    return parseInt(ans);
}