// Note: Modified to work with bytes as input
// Source: https://gist.githubusercontent.com/farhadi/2185197/raw/b290c2dcc0eef9c23015eab0bb335f08bee0e862/rc4.js

/*
 * RC4 symmetric cipher encryption/decryption
 *
 * @license Public Domain
 * @param string key - secret key for encryption/decryption
 * @param string str - string to be encrypted/decrypted
 * @return string
 */
module.exports = {
  encrypt: function (key, str) {
    var s = [], j = 0, x, res = ''
    for (var i = 0; i < 256; i++) {
      s[i] = i
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256
      x = s[i]
      s[i] = s[j]
      s[j] = x
    }
    i = 0
    j = 0
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256
      j = (j + s[i]) % 256
      x = s[i]
      s[i] = s[j]
      s[j] = x
      res += String.fromCharCode(str[y] ^ s[(s[i] + s[j]) % 256])
    }
    return res
  }
}
