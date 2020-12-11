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

export const ValidateEmail = (email: string) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return true;
  }
  return false;
};

export const randomId = () => {
  return Math.random().toString(36).substring(4);
};

export const moveToTheBack = async (arr: [], item: any) => {
  if (!Boolean(arr) || !Boolean(item)) {
    return null;
  }
  const completedItem = { ...item, completed: true };
  let filtered: any = [];
  filtered = arr.filter((e: any) => e._id !== item._id);
  filtered[filtered.length] = completedItem;
  return filtered;
};

export const moveToTheFront = async (arr: any, item: any) => {
  if (!Boolean(arr) || !Boolean(item)) {
    return null;
  }
  const incompleteItem = { ...item, completed: false };

  let filtered = arr.filter((e: any) => e._id !== item._id);
  filtered.unshift(incompleteItem);
  return filtered;
};

export const removeSingleItem = async (arr: any, item: any) => {
  if (!Boolean(arr) || !Boolean(item)) {
    return null;
  }

  return arr.filter((e: any) => e._id !== item._id);
};

export const getIncompleteItems = (arr: any) => {
  if (!Boolean(arr)) {
    return null;
  }
  let newArr = [];
  newArr = arr.filter((e: any) => e.completed === false);
  return newArr;
};
export const getTaskPercentage = (arr: any) => {
  if (!Boolean(arr)) {
    return null;
  }
  let newArr = [];
  newArr = arr.filter((e: any) => e.completed === true);
  let percentage = (newArr.length / arr.length) * 100;
  return percentage.toFixed(0);
};
