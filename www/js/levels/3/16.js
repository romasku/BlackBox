function calc(a) {
    if ((a % 4 == 0 && a % 100 != 0) || (a % 400 == 0)) return 1;
    else return 0;
}