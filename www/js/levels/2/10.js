function calc(a) {
    if (a < 10) return a;
    s = a.toString();
    var first = parseInt(s[0]);
    var rest = parseInt(s.substr(1, s.length - 1));
    return first*rest;
}