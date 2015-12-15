function calc(a) {
   var b = a;
   var f = [];
   for (var i = 0; a > 0; i++) {
        f[i] = a % 10;
        a = parseInt(a / 10);
    }
    f = f.sort();
    var rev = 0;
    for (var i = 0; i < f.length; i++) {
        rev *= 10;
        rev += f[i];
    }
    return Math.abs(rev - b);
}