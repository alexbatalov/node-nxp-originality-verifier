'use strict';

const assert = require('assert');
const OriginalityVerifier = require('..');

describe('OriginalityVerifier', function () {
  it('verifies all known tags', function () {
    const verifier = new OriginalityVerifier();
    assert(verifier.verify('0453c652fe4a80', 'edfd3263e7ddb1730260b832605205fb40fb32d7bb06f1db49f17706c2ed6727'));
    assert(verifier.verify('04ee45daa34084', 'ebb6102bff74b087d18a57a54bc375159a04ea9bc61080b7f4a85afe1587d73b'));
    assert(verifier.verify('34d959d16906a0', '7f17e881d214fc044a3df2e2b9e5fbad16330d4ff69cc4215b8585ccf3265cd9'));
  });

  it('verifies NXP MIFARE UL', function () {
    const verifier = new OriginalityVerifier('04494e1a386d3d3cfe3dc10e5de68a499b1c202db5b132393e89ed19fe5be8bc61');
    assert(verifier.verify('0453c652fe4a80', 'edfd3263e7ddb1730260b832605205fb40fb32d7bb06f1db49f17706c2ed6727'));
  });

  it('verifies NXP MIFARE UL EV1', function () {
    const verifier = new OriginalityVerifier('0490933bdcd6e99b4e255e3da55389a827564e11718e017292faf23226a96614b8');
    assert(verifier.verify('04ee45daa34084', 'ebb6102bff74b087d18a57a54bc375159a04ea9bc61080b7f4a85afe1587d73b'));
  });

  it('verifies MIKRON MIFARE UL', function () {
    const verifier = new OriginalityVerifier('04f971eda742a4a80d32dcf6a814a707cc3dc396d35902f72929fdcd698b3468f2');
    assert(verifier.verify('34d959d16906a0', '7f17e881d214fc044a3df2e2b9e5fbad16330d4ff69cc4215b8585ccf3265cd9'));
  });
});
