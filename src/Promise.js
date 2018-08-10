Promise.isPromise = function(value) {
  return typeof value === 'object' && (value instanceof Promise || typeof value.then === 'function');
};
