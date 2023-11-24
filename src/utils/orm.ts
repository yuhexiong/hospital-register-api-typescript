export const removeUndefined = (obj: any) => {
  const data = Object.assign({}, obj);
  Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
  return data;
}