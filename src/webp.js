global.isWebpSupported = false;

if(Image != null) {
  var img = new Image();

  img.onload = function() {
    global.isWebpSupported = img.width > 0 && img.height > 0;
  };

  img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
}
