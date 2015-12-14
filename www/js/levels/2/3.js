function calc(a) {
    a = a.toString();
    var first = parseInt(a[0]);
    var last =  parseInt(a[a.length - 1]);
    return parseInt(Math.abs(last - first));
}