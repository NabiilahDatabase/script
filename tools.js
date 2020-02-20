
groupBy(array: any[], key) {
  const raw = array.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  const result = [];
  for (const k in raw) {
    if (raw.hasOwnProperty(k)) {
      result.push({key: k, value: raw[k]});
    }
  }
  return result; // result: [..., {key: 'key', value: 'array'}, ...]
}
