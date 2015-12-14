function calc(a) {
    s = a.toString();
    var ans = 0;
    for( var i = 0; i < s.length - 1; i++) {
        ans += Math.abs(s.charAt(i) - s.charAt(i + 1));
    }
    return ans;
}