function Mash() {
  let n = 0xefc8249d;

  return function (data) {
    data = data.toString();
    for (let i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
}

function MRG32k3a() {
  let args = Array.prototype.slice.call(arguments);
  const m1 = 4294967087;
  const m2 = 4294944443;
  let s10 = 12345,
    s11 = 12345,
    s12 = 123,
    s20 = 12345,
    s21 = 12345,
    s22 = 123;

  if (args.length === 0) {
    args = [+new Date()];
  }
  let mash = Mash();
  for (let i = 0; i < args.length; i++) {
    s10 += mash(args[i]) * 0x100000000; // 2 ^ 32
    s11 += mash(args[i]) * 0x100000000;
    s12 += mash(args[i]) * 0x100000000;
    s20 += mash(args[i]) * 0x100000000;
    s21 += mash(args[i]) * 0x100000000;
    s22 += mash(args[i]) * 0x100000000;
  }
  s10 %= m1;
  s11 %= m1;
  s12 %= m1;
  s20 %= m2;
  s21 %= m2;
  s22 %= m2;
  mash = null;

  const uint32 = function () {
    const m1 = 4294967087;
    const m2 = 4294944443;
    const a12 = 1403580;
    const a13n = 810728;
    const a21 = 527612;
    const a23n = 1370589;

    let k, p1, p2;

    p1 = a12 * s11 - a13n * s10;
    k = p1 / m1 | 0;
    p1 -= k * m1;
    if (p1 < 0) p1 += m1;
    s10 = s11;
    s11 = s12;
    s12 = p1;

    p2 = a21 * s22 - a23n * s20;
    k = p2 / m2 | 0;
    p2 -= k * m2;
    if (p2 < 0) p2 += m2;
    s20 = s21;
    s21 = s22;
    s22 = p2;

    if (p1 <= p2) return p1 - p2 + m1;
    else return p1 - p2;
  };

  return function () {
    return uint32() * 2.3283064365386963e-10; // 2^-32
  };
}


export default MRG32k3a;
