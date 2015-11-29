function calc(a) {
    if (a % 2 == 0) return a + ((RAND % 10) + 1);
    else return a - ((RAND % 10) + 1);
}
