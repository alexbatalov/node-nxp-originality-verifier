/**
 * nxp-originality-verifier
 *
 * Created by Alexander Batalov on 06/23/2018.
 * Copyright (c) 2018 Alexander Batalov <alex.batalov@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const elliptic = require('elliptic');
const hash = require('hash.js');

const knownPublicKeys = require('./knownPublicKeys');

const secp128r1 = new elliptic.curve.short({
  p: 'fffffffd ffffffff ffffffff ffffffff',
  a: 'fffffffd ffffffff ffffffff fffffffc',
  b: 'e87579c1 1079f43d d824993c 2cee5ed3',
  n: 'fffffffe 00000000 75a30d1b 9038a115',
  gRed: false,
  g: [
    '161ff752 8b899b2d 0c28607c a52c5b86',
    'cf5ac839 5bafeb13 c02da292 dded7a83',
  ],
});

const ec = new elliptic.ec({
  curve: {
    curve: secp128r1,
    g: secp128r1.g,
    n: secp128r1.n,
  },
  hash: hash.sha1,
});

const toBuffer = stringOrBuffer => Buffer.isBuffer(stringOrBuffer) ? stringOrBuffer : Buffer.from(stringOrBuffer, 'hex');

class OriginalityVerifier {

  /**
   * @param {(string | Buffer | (string | Buffer)[])} [publicKeys=]
   */
  constructor(publicKeys) {
    if (!publicKeys) {
      publicKeys = knownPublicKeys;
    }

    if (!Array.isArray(publicKeys)) {
      publicKeys = [publicKeys];
    }

    this._publicKeys = publicKeys.map(key => ec.keyFromPublic(toBuffer(key)));
  }

  /**
   * @param {(string | Buffer)} tagId
   * @param {(string | Buffer)} originalitySignature
   * @returns {boolean}
   */
  verify(tagId, originalitySignature) {
    tagId = toBuffer(tagId);
    originalitySignature = toBuffer(originalitySignature);

    const rs = {
      r: originalitySignature.slice(0, 16),
      s: originalitySignature.slice(16, 32),
    };

    return this._publicKeys.some(pubKey => pubKey.verify(tagId, rs));
  }
}

module.exports = OriginalityVerifier;
