# NXP Originality Verifier

Lightweight library to verify NXP Originality Signature.

## Installation

```console
$ npm install nxp-originality-verifier --save
```

## Usage

This library assumes you already know how to work with RFID tags. It's up to
the calling application to obtain and provide tag ID and originality signature
to the verifier.

```js
const OriginalityVerifier = require('nxp-originality-verifier');

const originalityVerifier = new OriginalityVerifier();

const tagId = '04ee45daa34084';
const originalitySignature = 'ebb6102bff74b087d18a57a54bc375159a04ea9bc61080b7f4a85afe1587d73b';
if (!originalityVerifier.verify(tagId, originalitySignature)) {
  throw new Error('Failed to verify originality signature');
}
```

By default the verifier checks against all known public keys. If that is not
what you want, you can use a subset of known keys, or even your own keys (well
I guess that would be your tags' manufacturer keys).

```js
const originalityVerifier = new OriginalityVerifier([
  '04494e1a386d3d3cfe3dc10e5de68a499b1c202db5b132393e89ed19fe5be8bc61',
  '0490933bdcd6e99b4e255e3da55389a827564e11718e017292faf23226a96614b8',
]);
```

## Known public keys

### NXP

The widely known `04494e1a386d3d3cfe3dc10e5de68a499b1c202db5b132393e89ed19fe5be8bc61`
key works for `MIFARE UL` and `NTAG`. The `0490933bdcd6e99b4e255e3da55389a827564e11718e017292faf23226a96614b8`
key is for `MIFARE UL EV1`. I don't have access to other tag families, so if you
can verify keys against other tag families, please open an issue and let me know
about your findings. The keys are from [NXP TagInfo](https://play.google.com/store/apps/details?id=com.nxp.taginfolite).

### Mikron

The `04f971eda742a4a80d32dcf6a814a707cc3dc396d35902f72929fdcd698b3468f2` key is
for tags made by [Mikron](http://mikron.ru). As far as I know they don't sign
their tags unless specifically requested. In this case the `READ_SIG` command
returns all zeros.

## License

MIT
