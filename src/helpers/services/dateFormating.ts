export const setToZero = (date: string | Date) => {
  return new Date(new Date(new Date(date).setHours(0, 0, 0, 0)).toLocaleDateString());
};

export const GetSimpleDateString = (date: string | Date, lang: "hu" | "en") => {
  const { mm, dd, yyyy } = GetSimpleDate(date);
  return lang === "en" ? mm + "-" + dd + "-" + yyyy : yyyy + "-" + mm + "-" + dd;
};

const GetSimpleDate = (date: string | Date) => {
  var newDate = new Date(date);
  var dd = String(newDate.getDate()).padStart(2, "0");
  var mm = String(newDate.getMonth() + 1).padStart(2, "0");
  var yyyy = newDate.getFullYear();
  return { dd, mm, yyyy };
};
