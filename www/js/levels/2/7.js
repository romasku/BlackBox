function calc(a) {
  s = a.toString();
  var ans = 0;
  for( var i = 0; i < s.length; i++){
  	if (s.charAt(i) == '0') ans++;
  	if (s.charAt(i) == '6') ans++;
  	if (s.charAt(i) == '9') ans++;
  	if (s.charAt(i) == '8') ans+=2;  
  }
  return ans;
}
