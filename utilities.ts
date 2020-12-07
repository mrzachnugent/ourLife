export const displayPhoneNum = (num: string) => {
  let numArr = num.split("");
  if (num.length < 10) {
    numArr.splice(-4, 0, "-");
  }
  if (num.length === 10) {
    numArr.splice(-4, 0, "-");
    numArr.splice(-8, 0, ")");
    numArr.splice(-12, 0, "(");
  }
  if (num.length > 10) {
    numArr.splice(-4, 0, "-");
    numArr.splice(-8, 0, ")");
    numArr.splice(-12, 0, "(");
    numArr.splice(-13, 0, "-");
  }
  return numArr.join("");
};
