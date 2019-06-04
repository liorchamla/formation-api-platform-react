const cache = {};

function set(key, data) {
  cache[key] = {
    data,
    cachedAt: new Date().getTime()
  };
}

function get(key) {
  return new Promise(resolve => {
    resolve(
      cache[key] && cache[key].cachedAt + 15 * 60 * 1000 > new Date().getTime()
        ? cache[key].data
        : null
    );
  });
}

function invalidate(key) {
  delete cache[key];
}

export default {
  set,
  get,
  invalidate
};
