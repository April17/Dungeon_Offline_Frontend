let key = 0
export class KeyGenerator {
  counter = () => {
    return key ++
  }
}

export const filterDuplicate = (ary, keyWord) => {
  return ary.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[keyWord]).indexOf(obj[keyWord]) === pos;
  });
}
