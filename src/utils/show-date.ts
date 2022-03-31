export const addZero = (num: number) => {
  return num < 10 ? "0" + num : num;
};

export const showDate = (date: any, withTime: boolean = true) => {
  return `${addZero(date.getDate())}. ${addZero(date.getMonth() + 1)}. ${date.getFullYear()} ${withTime ? `${addZero(date.getHours())}:${addZero(date.getMinutes())}` : ``}`;
};