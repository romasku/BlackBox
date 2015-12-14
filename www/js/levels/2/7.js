function calc(a) {
    var ans = 0;
    while (a % 2 == 0) {
      ans++;
      a /= 2;
    }
    return ans;
}