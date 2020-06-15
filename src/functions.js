export const getDateAndTime = (seconds) => {
  let ParsedDate = new Date(seconds * 1000);
  ParsedDate =
    ParsedDate.getDate() +
    '.' +
    (ParsedDate.getMonth() + 1) +
    '.' +
    ParsedDate.getFullYear() +
    ' : ' +
    (ParsedDate.getHours() < 12
      ? '0' + ParsedDate.getHours()
      : ParsedDate.getHours()) +
    ':' +
    (ParsedDate.getMinutes() < 10
      ? '0' + ParsedDate.getMinutes()
      : ParsedDate.getMinutes()) +
    ':' +
    (ParsedDate.getSeconds() < 10
      ? '0' + ParsedDate.getSeconds()
      : ParsedDate.getSeconds());
  return ParsedDate;
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
