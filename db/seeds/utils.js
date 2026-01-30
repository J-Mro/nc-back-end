function createLookUpObj(data, newObjKey, newObjVal) {
  const lookupObj = {};
  if (data.length === 0) return lookupObj;
  for (const element of data) {
    lookupObj[element[newObjKey]] = element[newObjVal];
  }
  return lookupObj;
}

module.exports = createLookUpObj;
