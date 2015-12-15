function gcd (a, b) {
    if (a == 0 || b == 0) return a + b;
    if (a > b) return gcd(a % b, b);
    else return gcd(a, b % a);
}

function lcm (a, b) {
    return a * b / gcd(a, b);
}

function calc(a) {
    var b = [];
    for (var i = 0; a > 0; i++) {
        b[i] = a % 10;
        a = parseInt(a / 10);
    }
    if (b.length == 1) return b[0];
    var ans = lcm(b[0], b[1]);
    for (var i = 2; i < b.length; i++) ans = lcm(ans, b[i]);
    return ans;
}