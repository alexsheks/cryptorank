type Currency = {
  categoryId: number;
  name: string;
  availableSupply: number;
  category: string;
  price: PriceValues;
  marketCap: number;
  athPrice: ATHPriceValues;
  key: string;
  symbol: string;
  values: PriceValues2;
};

type PriceValues = {
  USD: number;
};

type ATHPriceValues = {
  USD: number;
};

type PriceValues2 = {
  USD: USD;
};

type USD = {
  marketCap: number;
  price: number;
};
