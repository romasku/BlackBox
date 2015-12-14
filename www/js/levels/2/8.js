function calc(a) {
    s = a.toString();
    var ans = 0;
    for(var i = 0; i < s.length; i++) {
        ans += s.charAt(i)*(i + 1);
    }
    return ans;
}