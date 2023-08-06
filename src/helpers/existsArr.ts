export const existsArr = (arr: any[] | null | undefined) => {
  if (arr && arr !== null && arr !== undefined) {
    return true;
  } else {
    return false;
  }
};
