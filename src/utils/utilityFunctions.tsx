export const getDeepNestedArrayCopyFrom = (srcArr: any) => {
  console.log("started deppCopy method");

  let destArr = [{}];
  srcArr.forEach((srcItem: {}) => destArr.push({ ...srcItem }));
  console.log("finished deppCopy method");
  return destArr;
};
