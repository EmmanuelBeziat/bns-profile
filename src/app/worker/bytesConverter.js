module.exports = {
  hexToBytes: function (hex) {
    let bytes = []

    for (let c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16))
    }
    return bytes
  },

  bytesToHex: function (bytes) {
    let hex = []

    for (let i = 0; i < bytes.length; i++) {
      hex.push((bytes.charCodeAt(i) >>> 4).toString(16))
      hex.push((bytes.charCodeAt(i) & 0xF).toString(16))
    }

    return hex.join('')
  }
}
