const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }

    const messageUpper = message.toUpperCase();
    const keyUpper = key.toUpperCase();
    let keyIndex = 0;
    let result = "";

    for (const char of messageUpper) {
      if (/[A-Z]/.test(char)) {
        const shift = this.calculateShift(keyUpper, keyIndex);
        const encryptedChar = String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
        result += encryptedChar;
        keyIndex = (keyIndex + 1) % keyUpper.length;
      } else {
        result += char;
      }
    }

    return this.direct ? result : result.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }

    const keyUpper = key.toUpperCase();
    let keyIndex = 0;
    let result = "";

    for (const char of encryptedMessage) {
      if (/[A-Z]/.test(char)) {
        const shift = this.calculateShift(keyUpper, keyIndex);
        const decryptedChar = String.fromCharCode(
          ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
        );
        result += decryptedChar;
        keyIndex = (keyIndex + 1) % keyUpper.length;
      } else {
        result += char;
      }
    }

    return this.direct ? result : result.split("").reverse().join("");
  }

  calculateShift(key, keyIndex) {
    return key.charCodeAt(keyIndex) - 65;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
