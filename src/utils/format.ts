export const fromATH = (ath: number, price: number) => {
  if (ath < 0 || price < 0) return NaN;
  return ((price - ath) / ath) * 100;
};

export const toATH = (ath: number, price: number) => {
  if (ath < 0 || price < 0) return NaN;
  return ((ath - price) / price) * 100;
};

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

export const convertValue = (
  amount: number,
  price1: number,
  price2: number
) => {
  if (amount < 0 || price1 < 0 || price2 < 0) return NaN;
  return (price1 / price2) * amount;
};
