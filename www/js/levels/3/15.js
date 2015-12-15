function calc(a) {
    a = a % 360;
    if (a < 90) return 1;
    if (a < 180) return 2;
    if (a < 270) return 3;
    return 4;
}