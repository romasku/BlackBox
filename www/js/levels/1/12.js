function calc(a) {
    var f1 = 1;
    var f2 = 1;
    var f = 2;
    while (f <= a)
    {
        f = f1+f2;
        f1 = f2;
        f2 = f;
    }
    if (a-f1 < f2-a) return f1;
    else return f2;
}