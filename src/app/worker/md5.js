// Note: Modified to work with bytes as input
// https://raw.githubusercontent.com/blueimp/JavaScript-MD5/master/js/md5.js

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*global unescape, define, module */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRol (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5Cmn (q, a, b, x, s, t) {
    return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5FF (a, b, c, d, x, s, t) {
    return md5Cmn((b & c) | ((~b) & d), a, b, x, s, t)
  }
  function md5GG (a, b, c, d, x, s, t) {
    return md5Cmn((b & d) | (c & (~d)), a, b, x, s, t)
  }
  function md5HH (a, b, c, d, x, s, t) {
    return md5Cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5II (a, b, c, d, x, s, t) {
    return md5Cmn(c ^ (b | (~d)), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMd5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5FF(a, b, c, d, x[i], 7, -680876936)
      d = md5FF(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5FF(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5FF(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5FF(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5FF(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5FF(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5FF(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5FF(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5FF(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5FF(c, d, a, b, x[i + 10], 17, -42063)
      b = md5FF(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5FF(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5FF(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5FF(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5FF(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5GG(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5GG(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5GG(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5GG(b, c, d, a, x[i], 20, -373897302)
      a = md5GG(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5GG(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5GG(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5GG(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5GG(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5GG(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5GG(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5GG(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5GG(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5GG(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5GG(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5GG(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5HH(a, b, c, d, x[i + 5], 4, -378558)
      d = md5HH(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5HH(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5HH(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5HH(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5HH(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5HH(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5HH(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5HH(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5HH(d, a, b, c, x[i], 11, -358537222)
      c = md5HH(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5HH(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5HH(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5HH(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5HH(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5HH(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5II(a, b, c, d, x[i], 6, -198630844)
      d = md5II(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5II(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5II(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5II(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5II(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5II(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5II(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5II(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5II(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5II(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5II(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5II(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5II(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5II(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5II(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMd5 (s) {
    return binl2rstr(binlMd5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHmacMd5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMd5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binlMd5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMd5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0F) +
      hexTab.charAt(x & 0x0F)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUtf8 (input) {
    return /* unescape(encodeURIComponent(*/ input /* )) */
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMd5 (s) {
    return rstrMd5(str2rstrUtf8(s))
  }
  function hexMd5 (s) {
    return rstr2hex(rawMd5(s))
  }
  function rawHmacMd5 (k, d) {
    return rstrHmacMd5(str2rstrUtf8(k), str2rstrUtf8(d))
  }
  function hexHmacMd5 (k, d) {
    return rstr2hex(rawHmacMd5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMd5(string)
      }
      return rawMd5(string)
    }
    if (!raw) {
      return hexHmacMd5(key, string)
    }
    return rawHmacMd5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
}(this))
