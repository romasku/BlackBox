function calc(a) {
  s = a.toString();
  var ans = 1;
  for( var i = 0; i < s.length; i++){
  	ans *= s.charAt(i);
  }
  return ans;
}
