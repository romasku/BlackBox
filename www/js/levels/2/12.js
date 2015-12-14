function calc(a) {
    a = a.toString();
    var ans = 0;
    for (var i = 0; i < a.length; i++) ans += Math.pow(parseInt(a[i]), 2);
    return ans;
}