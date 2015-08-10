function calc(a) {
	var f = [];
	var last = 0;
	while (a > 0) {
		f[last] = a % 10;
		last++;
		a = parseInt(a / 10);
	}
	f = f.sort();
	var ans = '';
	for (var i = 0; i < last; i++) ans += f[i];
	return ans;
}