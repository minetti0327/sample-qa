const getUniqueStr = myStrong => {
  let strong = 1000;
  if (myStrong) strong = myStrong;
  return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16);
};
export default (context, inject) => {
  inject("uniqStr", getUniqueStr);
};
