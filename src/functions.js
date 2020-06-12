export const getDateAndTime = (seconds) => {
  let ParsedDate = new Date(seconds * 1000);
  ParsedDate =
    ParsedDate.getDate() +
    '.' +
    (ParsedDate.getMonth() + 1) +
    '.' +
    ParsedDate.getFullYear() +
    ' : ' +
    ParsedDate.getHours() +
    ':' +
    ParsedDate.getMinutes() +
    ':' +
    ParsedDate.getSeconds();
  return ParsedDate;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
