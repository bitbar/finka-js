import './webp'

if(HTMLCanvasElement != null) {
  HTMLCanvasElement.prototype.defaultDataType = function() {
    if(global.isWebpSupported) {
      return 'image/webp';
    }
    return 'image/jpeg';

  };

  HTMLCanvasElement.prototype.toBase64 = function(type) {
    if(typeof type == 'undefined') {
      type = this.defaultDataType();
    }

    return this.toDataURL(type);
  };
  HTMLCanvasElement.prototype.toAlphaBase64 = function() {
    var type = 'image/png';
    if(global.isWebpSupported && false) { // disabled due to https://code.google.com/p/chromium/issues/detail?id=170565 :(
      type = 'image/webp';
    }
    return this.toBase64(type);
  };

  HTMLCanvasElement.prototype.toBlobType = function(callback, type) {
    var tmp, binary, arr, i;

    if(typeof type == 'undefined') {
      type = this.defaultDataType();
    }

    // First check if toBlob is supported
    if(typeof this.toBlob == 'function') {
      // Yep
      this.toBlob(callback, type, 0.9);

    } else {
      // Nope

      // So maybe MS?
      if(typeof this.msToBlob == 'function') {
        // Yeah!
        // This will be PNG file
        callback(this.msToBlob());

      } else {
        // OMG...
        tmp = this.toBase64(type);
        binary = atob(tmp.split(',')[1]);
        arr = [];
        tmp = binary.length;
        for(i = 0; i < tmp; i++) {
          arr.push(binary.charCodeAt(i));
        }

        callback(new Blob([new Uint8Array(arr)], {type: type}));
      }
    }
  };

  // Canvas downscale high quality - By GameAlchemist (MIT Licensed)
  // prototype implementation by Marek `marverix` Sierociński
  HTMLCanvasElement.prototype.downsize = function(scale) {
    var cv, sqScale,
      sw, sh, sx, sy, sIndex,
      tw, th, tx, tX, ty, tY,
      w, nw, wx, nwx, wy, nwy,
      crossX, crossY,
      yIndex, tIndex,
      sBuffer, tBuffer, pxIndex,
      sR, sG, sB, sA,
      resCV, resCtx, imgRes, tByteBuffer;

    cv = this;
    if (!(scale < 1) || !(scale > 0)) {throw 'scale must be a positive number <1 ';}
    sqScale = scale * scale; // square scale = area of source pixel within target
    sw = cv.width; // source image width
    sh = cv.height; // source image height
    tw = Math.floor(sw * scale); // target image width
    th = Math.floor(sh * scale); // target image height
    // EDIT (credits to @Enric ) : was ceil before, and creating artifacts :
    //                           var tw = Math.ceil(sw * scale); // target image width
    //                           var th = Math.ceil(sh * scale); // target image height
    sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
    tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
    tX = 0, tY = 0; // rounded tx, ty
    w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
    // weight is weight of current source point within target.
    // next weight is weight of current source point within next target's point.
    crossX = false; // does scaled px cross its current px right border ?
    crossY = false; // does scaled px cross its current px bottom border ?
    sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
    tBuffer = new Float32Array(4 * sw * sh); // target buffer Float32 rgb
    sR = sG = sB = sA = 0; // source's current point r,g,b

    for (sy = 0; sy < sh; sy++) {
      ty = sy * scale; // y src position within target
      tY = 0 | ty;     // rounded : target pixel's y
      yIndex = 4 * tY * tw;  // line index within target array
      crossY = tY != (0 | ty + scale);
      if (crossY) { // if pixel is crossing botton target pixel
        wy = tY + 1 - ty; // weight of point within target pixel
        nwy = ty + scale - tY - 1; // ... within y+1 target pixel
      }
      for (sx = 0; sx < sw; sx++, sIndex += 4) {
        tx = sx * scale; // x src position within target
        tX = 0 | tx;    // rounded : target pixel's x
        tIndex = yIndex + tX * 4; // target pixel index within target array
        crossX = tX != (0 | tx + scale);
        if (crossX) { // if pixel is crossing target pixel's right
          wx = tX + 1 - tx; // weight of point within target pixel
          nwx = tx + scale - tX - 1; // ... within x+1 target pixel
        }
        sR = sBuffer[sIndex ];   // retrieving r,g,b for curr src px.
        sG = sBuffer[sIndex + 1];
        sB = sBuffer[sIndex + 2];
        sA = sBuffer[sIndex + 3];

        /*
         if(!sA) continue;
         if (sA != 0xFF) {
         sR = (sR * sA) >> 8;
         sG = (sG * sA) >> 8;
         sB = (sB * sA) >> 8;
         }
         */

        if (!crossX && !crossY) { // pixel does not cross
          // just add components weighted by squared scale.
          tBuffer[tIndex ] += sR * sqScale;
          tBuffer[tIndex + 1] += sG * sqScale;
          tBuffer[tIndex + 2] += sB * sqScale;
          tBuffer[tIndex + 3] += sA * sqScale;
        } else if (crossX && !crossY) { // cross on X only
          w = wx * scale;
          // add weighted component for current px
          tBuffer[tIndex ] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          tBuffer[tIndex + 3] += sA * w;
          // add weighted component for next (tX+1) px
          nw = nwx * scale;
          tBuffer[tIndex + 4] += sR * nw;
          tBuffer[tIndex + 5] += sG * nw;
          tBuffer[tIndex + 6] += sB * nw;
          tBuffer[tIndex + 7] += sA * nw;
        } else if (crossY && !crossX) { // cross on Y only
          w = wy * scale;
          // add weighted component for current px
          tBuffer[tIndex ] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          tBuffer[tIndex + 3] += sA * w;
          // add weighted component for next (tY+1) px
          nw = nwy * scale;
          tBuffer[tIndex + 4 * tw ] += sR * nw;
          tBuffer[tIndex + 4 * tw + 1] += sG * nw;
          tBuffer[tIndex + 4 * tw + 2] += sB * nw;
          tBuffer[tIndex + 4 * tw + 3] += sA * nw;
        } else { // crosses both x and y : four target points involved
          // add weighted component for current px
          w = wx * wy;
          tBuffer[tIndex ] += sR * w;
          tBuffer[tIndex + 1] += sG * w;
          tBuffer[tIndex + 2] += sB * w;
          tBuffer[tIndex + 3] += sA * w;
          // for tX + 1; tY px
          nw = nwx * wy;
          tBuffer[tIndex + 4] += sR * nw;
          tBuffer[tIndex + 5] += sG * nw;
          tBuffer[tIndex + 6] += sB * nw;
          tBuffer[tIndex + 7] += sA * nw;
          // for tX ; tY + 1 px
          nw = wx * nwy;
          tBuffer[tIndex + 4 * tw ] += sR * nw;
          tBuffer[tIndex + 4 * tw + 1] += sG * nw;
          tBuffer[tIndex + 4 * tw + 2] += sB * nw;
          tBuffer[tIndex + 4 * tw + 3] += sA * nw;
          // for tX + 1 ; tY +1 px
          nw = nwx * nwy;
          tBuffer[tIndex + 4 * tw + 4] += sR * nw;
          tBuffer[tIndex + 4 * tw + 5] += sG * nw;
          tBuffer[tIndex + 4 * tw + 6] += sB * nw;
          tBuffer[tIndex + 4 * tw + 7] += sA * nw;
        }
      } // end for sx
    } // end for sy

    // create result canvas
    resCV = document.createElement('canvas');
    resCV.width = tw;
    resCV.height = th;
    resCtx = resCV.getContext('2d');
    imgRes = resCtx.getImageData(0, 0, tw, th);
    tByteBuffer = imgRes.data;
    // convert float32 array into a UInt8Clamped Array
    pxIndex = 0; //
    for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 4, tIndex += 4, pxIndex++) {
      tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
      tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
      tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
      tByteBuffer[tIndex + 3] = Math.ceil(tBuffer[sIndex + 3]);
    }
    // writing result to canvas.
    resCtx.putImageData(imgRes, 0, 0);

    return resCV;
  };
}